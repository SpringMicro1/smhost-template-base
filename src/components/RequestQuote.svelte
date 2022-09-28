<script>
    import { Link } from "svelte-routing";
    import templates from "../templates";
    import paypalInit from "../paypal";
    import queryString from "query-string";

    let template

    const query = queryString.parse(window.location.search);

    paypalInit(query);

    const submitContact = async (e) => {
    e.preventDefault();
    const status = document.getElementById("my-form-status");
    const formData = new FormData(e.target);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: new URLSearchParams(formData).toString(),
    })
        .then((response) => {
        status.innerHTML =
            "Thanks for your submission! We will get in touch shortly.";
        status.classList.add("text-success");
        status.classList.remove("text-danger");
        e.target.reset();
        })
        .catch((error) => {
        status.innerHTML =
            "Oops! There was a problem submitting your form. Please refresh the page and try again.";
        status.classList.add("text-danger");
        status.classList.remove("text-success");
        });
    };
</script>

<form
  id="contact"
  name="contact"
  class="mt-5 py-1"
  on:submit={submitContact}
  method="POST"
  data-netlify={true}
>
  <h2 class="h1 text-center">Request A Quote</h2>

  <!-- For the netlify bots -->
  <input type="hidden" name="form-name" value="contact" />

  <div class="mb-3 mx-auto">
    <label for="fullname" class="form-label">Full Name</label>
    <input
      type="text"
      class="form-control"
      id="fullname"
      name="fullname"
      placeholder="John Doe"
      required="true"
      aria-required="true"
    />
  </div>
  <div class="mb-3 mx-auto">
    <label for="email" class="form-label">Email Address</label>
    <input
      type="email"
      class="form-control"
      id="email"
      name="email"
      placeholder="name@example.com"
      required="true"
      aria-required="true"
    />
  </div>
  <div class="mb-3 mx-auto">
    <label for="template" class="form-label">Preferred Template
      {#if window.pageElements?.templateLinks}
        (<Link to="/templates">
          Browse Templates
        </Link>)
      {/if}
    </label>
    <select
      class="form-select"
      id="template"
      name="template"
      required="true"
      aria-required="true"
    >
      {#each templates as t}
        <option
          value={t.image.split(".")[0]}
          selected={template === t.image.split(".")[0]}
        >
          {t.image.split(".")[0]}
        </option>
      {/each}
    </select>
  </div>
  <div class="mb-3 mx-auto">
    <label for="brand-color" class="form-label">
      Select Brand Color <em class="text-muted">(optional)</em>
    </label>
    <input
      type="color"
      class="form-control p-0"
      id="brand-color"
      name="brand-color"
      style="width: 32px"
    />
  </div>

  <div class="mb-3 mx-auto">
    <label for="message" class="form-label">Message</label>
    <textarea
      class="form-control"
      id="message"
      name="message"
      rows="3"
      placeholder="What would you like for your website?"
      required="true"
      aria-required="true"
    />
  </div>

  <div class="mb-3 mx-auto">
    <button type="submit" class="btn btn-primary text-white">Submit</button>
    <p id="my-form-status" class="my-2" />
  </div>
</form>