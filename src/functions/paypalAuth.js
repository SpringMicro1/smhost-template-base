const { default: axios } = require("axios");

exports.handler = async function (event, context, callback) {
  // console.log(event);
  const PAYPAL_ORIGIN = event.headers.host.includes("localhost")
    ? "api-m.sandbox.paypal.com"
    : "api-m.paypal.com";

  const accessResponse = await axios({
    url: `https://${PAYPAL_ORIGIN}/v1/oauth2/token`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-Language": "en_US",
      "Content-Type": "x-www-form-urlencoded",
    },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
    data: new URLSearchParams({
      grant_type: "client_credentials",
    }),
  });

  const accessToken = accessResponse.data.access_token;
  if (accessToken) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ accessToken }),
    });
  } else {
    callback(null, {
      statusCode: accessResponse.status,
      body: JSON.stringify({
        message: accessResponse.statusText,
      }),
    });
  }
};
