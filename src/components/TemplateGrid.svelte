<script>
    import templates from "../templates";

    let template
</script>

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