
<script lang="js">
  import templates from "./templates";
  import paypalInit from "./paypal";
  import queryString from "query-string";

  const query = queryString.parse(window.location.search);

  paypalInit(query);

  let template = templates[0];

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

  document.addEventListener("scroll", () => {
    lastScrollTime = Date.now()
    if (firstScroll && location.href.includes("#")) {
      rememberScrollingToElement()
    }
    firstScroll = false
    if (window.scrollY > 200 && !scrollingToElement) {
      document.querySelector("nav").classList.add("sticky")
    } else {
      document.querySelector("nav").classList.remove("sticky")
    }
  });

  if (document.readyState === 'complete') {
    bodyLoaded()
  } else {
    addEventListener("load", bodyLoaded)
  }

  function bodyLoaded () {
    startWaterAnimation()
    listenForScrollingLinks()
  }

  function startWaterAnimation () {
    let elements = document.querySelectorAll("svg path")
    elements.forEach(element => {
        // if the element is blue
        let fill = element.getAttribute("fill")
        if (/#.{6}/.test(fill)) {
            let r = parseInt(/(?<=#).{2}/.exec(fill)[0], 16)
            let g = parseInt(/(?<=#.{2}).{2}/.exec(fill)[0], 16)
            let b = parseInt(/(?<=#.{4}).{2}/.exec(fill)[0], 16)
            if (fill === "#ffffff" || (b > r && b > g && b > 50)) {
                element.classList.add("shimmer")
                element.style.animationDelay = `${(Math.random() + 1) / -0.1}s`
                element.style.animationDuration = `${(Math.random() + 1) / 0.1}s`
            }
        }
    })
  }

  function generateColors(num) {
    let output = ""
    for (let i = 0; i < num; i++) {
      output += "#"
      let lightness = Math.random()
      let r = (0.1 * Math.random()) + (lightness / 2.5)
      let g = (0.25 * Math.random()) + (lightness / 1.5)
      let b = (0.15 * Math.random()) + 0.6 + (lightness / 4)
      let colors = [r, g, b]
      colors.forEach(color => {
        let hex = Math.round(color * 256).toString(16)
        while (hex.length < 2) hex = "0" + hex
        output += hex
      })
      output += "\n"
    }
    return output
  }

  let firstScroll = true
  let scrollingToElement = false
  let lastScrollTime = Date.now()
  let scrollingInterval

  function listenForScrollingLinks () {
    document.querySelectorAll("a[href^='#']").forEach(element=>{
      element.addEventListener("click", rememberScrollingToElement)
    })
  }

  function rememberScrollingToElement () {
    scrollingToElement = true
    console.log("remember")
    lastScrollTime = Date.now()
    clearInterval(scrollingInterval)
    scrollingInterval = setInterval(()=>{
      if (Date.now() - lastScrollTime > 100) {
        scrollingToElement = false
        clearInterval(scrollingInterval)
      }
    }, 100)
  }

  document.addEventListener("scroll", ()=>{
    document.querySelectorAll(".plan").forEach(element=>{
      element.style.animationDelay = `-${1 - (Math.min(Math.max(element.getBoundingClientRect().top, window.innerHeight - element.getBoundingClientRect().bottom), window.innerHeight / 2) / (window.innerHeight/2))}s`
    })
  })
</script>
<div id="waterfall-container">
  <svg id="waterfall-animation" xmlns="http://www.w3.org/2000/svg" viewBox="100 0 1000 3000">
    <g transform="translate(102 482) scale(3 5)"><path fill="#378ac1" d="M -21 -446 L -63 -388 L 1 -327 L -33 -271 L -7 -220 L -50 -143 L -7 -112 L -50 -34 L 1 59 L -63 135 L -33 183 L -69 272 L -21 310 L -63 404 L -21 469 L -50 528 L 26 500 L 32 428 L 26 349 L 61 282 L 26 209 L 69 135 L 32 59 L 69 -34 L 26 -82 L 61 -154 L 20 -185 L 61 -261 L 26 -293 L 49 -374 L 14 -429 L 43 -488 L 1 -528 L -33 -494 z" /></g><g transform="translate(194 504) scale(3 5)"><path fill="#5294d6" d="M -15 -526 L -77 -474 L -41 -447 L -87 -375 L -32 -330 L -63 -259 L -4 -215 L -54 -144 L -4 -110 L -77 -4 L -32 26 L -87 98 L -15 133 L -77 236 L -41 288 L -69 345 L -32 436 L -87 472 L -41 526 L 28 515 L 4 426 L 44 364 L -4 310 L 44 224 L 4 62 L 49 18 L -4 -22 L 56 -82 L 13 -144 C 13 -144 92 -159 86 -164 C 80 -169 28 -245 28 -245 L 56 -292 L 18 -330 L 44 -383 L -22 -426 L 18 -480 z" /></g><g transform="translate(279 497) scale(3 5)"><path fill="#7ca5e1" d="M -14 -526 L -51 -482 L -21 -431 L -51 -395 L -21 -338 L -51 -294 L -3 -240 L -51 -196 L -14 -154 L -51 -78 L 14 -7 L -43 39 L -3 106 L -51 184 L 14 251 L -43 308 L -3 386 L -57 450 L -13 526 L 47 476 L 2 438 L 47 380 L 26 339 L 58 308 L 36 238 L 58 175 L 26 115 L 47 72 L 14 21 L 58 -28 L 26 -78 L 47 -146 L 14 -180 L 47 -230 L 2 -300 L 36 -356 L -3 -400 L 13 -444 L -3 -490 z" /></g><g transform="translate(355 498) scale(3 5)"><path fill="#214bc6" d="M 13 -533 L -53 -460 L -16 -382 L -73 -270 L 1 -176 L -66 -77 L 1 46 L -66 131 L 23 198 L -66 299 L -16 373 L -53 439 L -6 533 L 53 482 L 23 422 L 42 357 L 13 299 L 53 241 L 31 139 L 42 59 L 66 -44 L 23 -120 L 73 -201 L 31 -292 L 42 -372 L 13 -432 L 53 -502 z" /></g><g transform="translate(480 497) scale(3 5)"><path fill="#1624b1" d="M -12 -526 L -58 -468 L -22 -405 L -58 -321 L -22 -269 L -50 -210 L -2 -153 L -50 -96 L -12 -49 L -58 31 L -22 79 L -64 147 L -30 207 L -58 279 L -30 325 L -64 410 L -30 467 L -64 526 L 28 526 L -2 467 L 28 405 L 5 349 L 42 269 L 5 207 L 42 126 L 5 62 L 37 -6 L 19 -49 L 64 -118 L 37 -153 L 64 -228 L 14 -269 L 64 -328 L 20 -388 L 64 -461 z" /></g><g transform="translate(556 516) scale(3 5)"><path fill="#658ad0" d="M 26 -538 L -31 -472 L 20 -377 L -56 -293 L 8 -232 L -43 -158 L 26 -72 L -76 -11 L 20 38 L -62 133 L -31 243 L -76 299 L -12 382 L -87 454 L -4 538 L 42 507 L 8 445 L 47 365 L 8 313 L 42 215 L -4 133 L 68 38 L 35 -33 L 78 -108 L 55 -192 L 87 -262 L 47 -318 L 78 -416 L 26 -488 L 55 -538 z" /></g><g transform="translate(653 508) scale(3 5)"><path fill="#5ac5e2" d="M -31 -531 L 23 -449 L -44 -385 L 9 -284 L -57 -223 L -0 -131 L -77 -56 L -36 98 L -97 172 L 23 250 L -44 328 L -16 392 L -77 452 L -16 531 L 64 462 L 34 392 L 78 328 L 50 226 L 88 143 L 23 66 L 96 -19 L 23 -64 L 71 -160 L 8 -216 L 56 -319 L -9 -371 L 56 -439 L 23 -531 z" /></g><g transform="translate(780 498) scale(3 5)"><path fill="#3280be" d="M -20 -533 L -66 -463 L -28 -427 L -61 -374 L -28 -306 L -74 -224 L -9 -131 L -61 -32 L -20 87 L -74 155 L -9 249 L -61 348 L -1 431 L -66 526 L 74 533 L 53 465 L 74 357 L 17 316 L 59 235 L -1 180 L 53 87 L 17 1 L 53 -70 L 17 -131 L 53 -224 L 25 -278 L 59 -354 L -9 -395 L 42 -463 z" /></g><g transform="translate(886 505) scale(3 5)"><path fill="#70b4e9" d="M -10 -518 L -48 -444 L -4 -380 L -53 -293 L 8 -202 L -31 -128 L 2 -62 L -63 30 L -31 141 L -76 201 L -31 306 L -76 370 L -20 469 L -64 535 L 61 527 L 28 462 L 76 381 L -4 297 L 20 253 L -4 183 L 34 123 L -4 10 L 76 -52 L 28 -112 L 61 -202 L 20 -260 L 76 -341 L 20 -458 L 61 -535 z" /></g><g transform="translate(1016 505) scale(3 5)"><path fill="#0d36aa" d="M 0 -535 L -60 -445 L 0 -359 L -44 -276 L 6 -177 L -60 -135 L -17 -23 L -70 64 L 15 151 L -83 236 L 0 300 L -53 408 L -17 467 L -44 535 L 62 480 L 6 408 L 70 323 L 15 247 L 62 168 L 0 58 L 76 -33 L 0 -104 L 83 -201 L 30 -265 L 83 -375 L -7 -437 L 42 -511 z" /></g><g transform="translate(-48 490) scale(3 5)"><path fill="#1f18b1" d="M 24 -520 L 88 -432 L 29 -376 L 80 -304 L 29 -208 L 88 -144 L 36 -88 L 80 -8 C 80 -8 10 83 12 87 C 13 91 58 154 58 154 L 24 257 L 66 319 L 12 369 L 58 447 L -10 520 L -57 434 L -22 369 L -57 282 L -10 233 L -57 127 L -10 54 L -87 -45 L -3 -120 L -57 -208 L -10 -276 L -57 -340 L -3 -444 L -37 -501 z" /></g>
  </svg>
</div>

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">
      <h1 class="navbar-brand m-0">SpringMicro</h1>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href={window.pageElements?.plans ? "#hosting" : "/#hosting"}>Hosting</a>
          <span class="slide-border bottom"></span>    <span class="slide-border left"></span>    <span class="slide-border right"></span>    <span class="slide-border top"></span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href={window.pageElements?.templateGrid ? "#templates" : "/templates#templates"}>Templates</a>
          <span class="slide-border bottom"></span>    <span class="slide-border left"></span>    <span class="slide-border right"></span>    <span class="slide-border top"></span>
        </li>
        <li class="nav-item">
          <a class="nav-link pay-link" href={window.pageElements?.purchasePlan ? "#pay" : "/#pay"}>Purchase Plan</a>
          <span class="slide-border bottom"></span>    <span class="slide-border left"></span>    <span class="slide-border right"></span>    <span class="slide-border top"></span>
        </li>
        <li class="nav-item">
          <a class="nav-link" href={window.pageElements?.requestQuote ? "#contact" : "/#contact"}>Contact</a>
          <span class="slide-border bottom"></span>    <span class="slide-border left"></span>    <span class="slide-border right"></span>    <span class="slide-border top"></span>
        </li>
      </ul>
      <span class="text-primary fw-bold"><i>Beta Version</i></span>
    </div>
  </div>
</nav>
<main class="container">
  {#if window.pageElements?.header}
    <header id="top" class="pt-5 d-flex flex-column align-items-start">
      <h2>SpringMicro <span>Web Hosting</span></h2>
      <ul class="list-unstyled hosting-list">
        <li>One-on-One Customer Service</li>
        <li>Scalable Hosting Plans</li>
        <li>Website Building</li>
        {#if window.pageElements?.templateLinks}
          <li>
            <a href="/templates">
              <button class="my-3 btn btn-primary text-white fs-4">
                Browse Templates
              </button>
            </a>
          </li>
        {/if}
      </ul>
    </header>
  {/if}

  {#if !(query.quoteID && query.quoteEmail)}
    {#if window.pageElements?.plans}
      <section id="hosting">
        <div class="row my-4 justify-content-around hosting-row text-center">
          <div class="col-10 col-sm-9 col-md-4 col-lg-3 mt-md-5">
            <div class="bg-light d-flex flex-column plan">
              <h3 class="pb-3 border-bottom">
                Single Website Hosting<br />
                  <img src="images/fish-goldfish.png" alt="goldfish" class="small hosting-image" />
              </h3>
              <h3 class="mb-0 pb-2 text-primary">$3.00/mo</h3>
              <p class="pb-3 border-bottom text-secondary">
                All the basics for starting a single small website.
              </p>
              <ul class="text-lg-right list-unstyled">
                <li class="mb-1">Starter Instances</li>
                <li class="mb-1">SSL Certificate</li>
                <li class="mb-1">Email Support</li>
                <li class="mb-1">Template Customizations</li>
              </ul>
            </div>
          </div>
          <div class="col-10 col-sm-9 col-md-4 col-lg-3 mt-4">
            <div class="bg-light d-flex flex-column plan">
              <h3 class="pb-3 border-bottom">
                Multiple Website Hosting<br />
                  <img src="images/fish-marlin.png" alt="marlin" class="medium hosting-image" />
              </h3>
              <h3 class="mb-0 pb-2 text-primary">$4.17/mo</h3>
              <p class="pb-3 border-bottom text-secondary">
                All the basics for starting/hosting up to 3 websites.
              </p>
              <ul class="text-lg-right list-unstyled">
                <li class="mb-1">Starter Instances</li>
                <li class="mb-1">SSL Certificates</li>
                <li class="mb-1">Email Support</li>
                <li class="mb-1">Template Customizations</li>
                <li class="mb-1">Personal Manager</li>
                <li class="mb-1">Backups</li>
              </ul>
            </div>
          </div>
          <div class="col-10 col-sm-9 col-md-4 col-lg-3 mt-md-0 mt-4">
            <div class="bg-light d-flex flex-column plan">
              <h3 class="pb-3 border-bottom">
                Enterprise Website Hosting<br />
                  <img src="images/fish-whale.png" alt="whale" class="large hosting-image" />
              </h3>
              <h3 class="mb-0 pb-2 text-primary">Get a Quote</h3>
              <p class="pb-3 border-bottom text-secondary">
                For custom web development needs.
              </p>
              <ul class="text-lg-right list-unstyled">
                <li class="mb-1">Large Instances</li>
                <li class="mb-1">SSL Certificates</li>
                <li class="mb-1">Email and Phone Support</li>
                <li class="mb-1">Personal Manager</li>
                <li class="mb-1">Backups</li>
                <li class="mb-1">Custom Web Development</li>
              </ul>
              <a class="btn mt-auto btn-block btn-secondary btn-lg" href={window.pageElements?.requestQuote ? "#contact" : "/#contact"}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    {/if}

    <script>
      function hide(evt) {
        // evt.target refers to the clicked <li> element
        // This is different than evt.currentTarget, which would refer to the parent <ul> in this context
        if (evt.target.parentElement.parentElement.style.width == "100%")
          evt.target.parentElement.parentElement.style.width = ""
        else 
          evt.target.parentElement.parentElement.style.width = "100%"
      }
    </script>

    <section id="templates" class="mt-5 pt-1">
      {#if window.pageElements?.templateGrid}
        <h2 class="h1 text-center mb-3">Pick A Template</h2>

        <div
          id="template-grid"
          class="row flex-wrap justify-content-center gx-2 gy-2"
        >
          {#each templates as t}
            <div class="col-lg-4 col-sm-6 col-12">
              <div class="card">
                <img
                  onclick="hide(event)"
                  src={`/images/templates/${t.image}`}
                  class="card-img-top"
                  alt={t.image}
                />
                <div class="card-body d-flex flex-column align-items-center">
                  <h5 class="card-title">{t.image.split(".")[0]}</h5>
                  <button
                    on:click={() => {
                      template = t.image.split(".")[0];
                      document.getElementById("contact").scrollIntoView();
                    }}
                    class="btn btn-primary text-white"
                  >
                    Select Template
                  </button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      {#if window.pageElements?.requestQuote}
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
                (<a href="/templates">
                  Browse Templates
                </a>)
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

          <div class="mb-3 mx-auto text-end">
            <button type="submit" class="btn btn-primary text-white">Submit</button>
            <p id="my-form-status" class="my-2" />
          </div>
        </form>
      {/if}
    </section>
  {/if}

  {#if window.pageElements?.templateLinks}
    <div class="d-block text-center">
        <a href="/templates">
        <button class="my-3 btn btn-primary text-white fs-4">
          Browse Templates
        </button>
      </a>
    </div>
  {/if}

  {#if window.pageElements?.purchasePlan}
    <section id="pay" class="my-5 pt-1">
      <h2 class="h1 text-center mb-3">Purchase a Plan</h2>
      <div class="container-fluid">
        <div
          id="paypal-message"
          class="d-flex flex-column align-items-center"
        ></div>
        <form id="quote-form" action="/#pay">
          <div class="row mb-2">
            <label for="quoteID" class="col-sm-3 col-form-label fs-4"
              >Quote ID</label
            >
            <div class="col-sm-9">
              <input
                name="quoteID"
                id="quoteID"
                class="form-control form-control-lg"
                type="text"
                placeholder="xxxxxx"
              />
            </div>
          </div>
          <div class="row">
            <label for="quoteEmail" class="col-sm-3 col-form-label fs-4"
              >Email</label
            >
            <div class="col-sm-9">
              <input
                name="quoteEmail"
                id="quoteEmail"
                class="form-control form-control-lg"
                type="email"
                placeholder="name@example.com"
              />
            </div>
          </div>
          <div class="text-end">
            <button
              type="submit"
              class="my-3 btn btn-primary text-white fs-4"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
      <div id="paypal-buttons" class="mx-4"></div>
    </section>
  {/if}

  <form name="contact" netlify netlify-honeypot="bot-field" hidden>
    <input type="text" name="fullname" />
    <input type="email" name="email" />
    <select name="template"></select>
    <input type="color" name="brand-color" />
    <textarea name="message"></textarea>
  </form>
</main>

<footer class="mt-3">
  <p class="text-center">
    Water photo by Gabriel Peter{#if window.pageElements?.plans}, Fish graphics by Vecteezy{/if}
  </p>
  <p class="text-center">
    &copy; <span id="copyright-year">{new Date().getFullYear()}</span> SpringMicro
  </p>
</footer>