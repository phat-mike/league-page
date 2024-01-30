<script>
    import { waitForAll } from '$lib/utils/helper';

    export let embedLink;
</script>

<style>
    .g-doc-constitution {
        margin-top: 2em; /* Adjust the margin as needed */
        padding: 1em;
        border: 1px solid #ddd; /* Add a border for separation */
        border-radius: 8px; /* Optional: Add border radius for a rounded look */
        background-color: #f9f9f9; /* Optional: Add a light background color */
    }
</style>

<div class="g-doc-constitution">
    {#await waitForAll(embedLink) }
        <p>Retrieving constitution data...</p>
    {:then [embedLink] }
        <iframe src={embedLink} title="Constitution" width="100%" height="1000px" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
    {:catch error}
        <!-- promise was rejected -->
        <p>Something went wrong: {error.message}</p>
    {/await}
</div>
