import { loadScript } from "@paypal/paypal-js";

const COLUMN_NAMES = {
  name: "Customer Name",
  email: "Customer Email",
  planID: "PayPal Plan ID",
  description: "Description of Plan",
  contactEmail: "Email Address",
  quoteID: "Quote ID",
};

export const PAYPAL_ORIGIN =
  window.location.hostname === "localhost"
    ? "api-m.sandbox.paypal.com"
    : "api-m.paypal.com";

export default async function paypalInit(query) {
  const paypalMessage = document.querySelector("#paypal-message");
  const quoteForm = document.querySelector("#quote-form");

  function badQuote() {
    paypalMessage.innerHTML = `<p class="fs-5 mb-3 text-center">
      Quote configured incorrectly, contact <a href="mailto:kgibson@springmicro.com">kgibson@springmicro.com</a> for help.
    </p>`;
  }

  async function loadButtons(planID) {
    let paypal;

    try {
      paypal = await loadScript({
        "client-id": PAYPAL_CLIENT_ID,
        intent: "subscription",
        vault: true,
      });
    } catch (error) {
      console.error("failed to load the PayPal JS SDK script", error);
    }

    if (paypal) {
      try {
        await paypal
          .Buttons({
            style: {
              shape: "pill",
              color: "gold",
              layout: "vertical",
              label: "paypal",
            },
            createSubscription: function (data, actions) {
              return actions.subscription.create({
                /* Creates the subscription */
                plan_id: planID,
                quantity: 1, // The quantity of the product for a subscription
              });
            },
            onApprove: function (data, actions) {
              // TODO: Post to Google Sheets
              paypalMessage.innerHTML = `
                <h2 class="text-center">Payment Received</h2>
                <p class="text-center">Check your email for a receipt.<br>Subscription ID: ${data.subscriptionID}</p>
                <a class="btn btn-primary d-inline-block mx-auto text-white" href="/">Exit</a>
              `;
              // console.log(data);
              document.querySelector("#paypal-buttons").innerHTML = "";
            },
          })
          .render("#paypal-buttons");
      } catch (error) {
        console.error("failed to render the PayPal Buttons", error);
      }
    }
  }

  async function getPayPalPlanInfo(planID) {
    const accessResponse = await fetch(`/.netlify/functions/paypalAuth`);
    const accessJSON = await accessResponse.json();
    const PAYPAL_ACCESS_TOKEN = accessJSON.accessToken;

    const response = await fetch(
      `https://${PAYPAL_ORIGIN}/v1/billing/plans/${planID}`,
      {
        headers: {
          Authorization: `Bearer ${PAYPAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();

    if (json.status !== "ACTIVE") {
      badQuote();
    } else {
      // Get product
      const productRes = await fetch(
        `https://${PAYPAL_ORIGIN}/v1/catalogs/products/${json.product_id}`,
        {
          headers: {
            Authorization: `Bearer ${PAYPAL_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const productJSON = await productRes.json();

      const quoteInfo = new Map();
      quoteInfo.set(COLUMN_NAMES.name, json.name);
      quoteInfo.set("Product Name", productJSON.name);
      quoteInfo.set("Product Description", productJSON.description);
      quoteInfo.set(
        "Setup Fee",
        new Intl.NumberFormat(window.navigator.language, {
          style: "currency",
          currency: json.payment_preferences.setup_fee.currency_code,
        }).format(json.payment_preferences.setup_fee.value)
      );
      json.billing_cycles.forEach((cycle, i) => {
        let cycleHTML = `<div>
        <p class="mb-0">Every ${
          cycle.frequency.interval_count
        } ${cycle.frequency.interval_unit.toLowerCase()}</p>
        ${cycle.pricing_scheme.tiers.map(
          (tier) =>
            `<p class="mb-0">Starting ${cycle.frequency.interval_unit.toLowerCase()} ${
              tier.starting_quantity
            }: ${new Intl.NumberFormat(window.navigator.language, {
              style: "currency",
              currency: tier.amount.currency_code,
            }).format(tier.amount.value)}</p>`
        )}
      </div>`;
        cycleHTML = cycleHTML.replaceAll("</p>,<p", "</p><p");
        quoteInfo.set("Billing Cycle " + (i + 1), cycleHTML);
      });

      let quoteTableHTML = `<table class="table"><tbody>`;
      for (const pair of quoteInfo) {
        quoteTableHTML += `<tr>
        <th scope="row">${pair[0]}</th>
        <td>${pair[1]}</td>
      </tr>`;
        // console.log(pair[0], pair[1]);
      }
      quoteTableHTML += `</tbody></table>`;
      paypalMessage.innerHTML = quoteTableHTML;

      loadButtons(planID);
    }
  }

  // Check if quote in Google Sheets
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEETS_ID}/values/${SHEETS_NAME}?key=${SHEETS_API_KEY}`
  );
  const json = await response.json();

  if (query.quoteID && query.quoteEmail) {
    document.querySelector("main").childNodes.forEach((el) => {
      if (el.id !== "pay") {
        document.querySelector("main").removeChild(el);
      }
    });
    const quoteIdIndex = json.values[0].indexOf(COLUMN_NAMES.quoteID);
    const nameIndex = json.values[0].indexOf(COLUMN_NAMES.name);
    const emailIndex = json.values[0].indexOf(COLUMN_NAMES.email);
    const planIdIndex = json.values[0].indexOf(COLUMN_NAMES.planID);
    const quoteIdInput = query.quoteID;
    const emailInput = query.quoteEmail;
    // First, check the row for quote id, assuming id = hosting<rowIndex>
    // (e.g. hosting1  = row 2 in spreadsheet (index 1))
    let quoteRowIndex = parseInt(quoteIdInput.replace(/[^\d]+/, ""));
    let quoteExists = false;
    try {
      quoteExists = json.values[quoteRowIndex][emailIndex] === emailInput;
      if (!quoteExists) {
        throw Error("quote not found at index", quoteRowIndex);
      }
    } catch {
      // If quote at that row does not exist
      // Do a linear search for the quote
      json.values.forEach((row, i) => {
        if (
          row[quoteIdIndex] === quoteIdInput &&
          row[emailIndex] === emailInput
        ) {
          quoteExists = true;
          quoteRowIndex = i;
          return;
        }
      });
    }

    if (quoteExists) {
      quoteForm.parentElement.removeChild(quoteForm);
      const planID = json.values[quoteRowIndex][planIdIndex];
      if (planID) {
        paypalMessage.innerHTML = `<div class="spinner-border mx-auto my-2 text-primary"></div>`;
        getPayPalPlanInfo(planID);
      } else {
        badQuote();
      }
    } else {
      paypalMessage.innerHTML = `<p class="fs-5 mb-3">Quote Does Not Exist</p>`;
    }
  }
  // });
}
