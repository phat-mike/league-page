<script>
    import {constitutionEmbedLink} from "$lib/utils/leagueInfo"
</script>

<style>
    .g-doc-constitution {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Adjust as needed */
        width: 850px;
        margin: 0 auto; /* Center the container horizontally */
        padding: 1em;
        border: 1px solid #ddd; /* Add a border for separation */
        border-radius: 8px; /* Optional: Add border radius for a rounded look */
        background-color: #f9f9f9; /* Optional: Add a light background color */
    }
</style>

<div class="g-doc-constitution">
    <iframe src={constitutionEmbedLink} style="width:100%; height:100%;" title="Constitution"></iframe>
</div>