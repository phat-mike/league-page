<script>
    import { onMount } from 'svelte';
    import { constitutionFileID } from '$lib/utils/leagueInfo';

    // Load Google Cloud service account creds from Vercel env var
    const GOOGLE_APPLICATION_CREDENTIALS = import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS; 
    import { google } from 'googleapis';

    // Use the service account credentials
    const credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);

    // Set up read-only auth
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });

    let embedLink;

    // Function to fetch document metadata and extract the embeddable link
    const fetchDocumentMetadata = async () => {
        try {
            const docs = google.docs({ version: 'v1', auth });

            // Retrieve document metadata, including sharing information
            const response = await docs.documents.get({
                documentId: constitutionFileID,
            });

            // Extract the embeddable link from the sharing metadata
            embedLink = response.data.documentSharingMetadata?.sharingUrl;

            if (!embedLink) {
                console.error('No embeddable link found.');
            }
        } catch (error) {
            console.error('Error making API request:', error);
        }
    };

    onMount(async () => {
        console.log('Constitution onMount triggered');
        await fetchDocumentMetadata();

        if (embedLink) {
            // Embed the document on your site using the obtained link
            const iframe = document.createElement('iframe');
            iframe.src = embedLink;
            iframe.width = '600';
            iframe.height = '780';
            iframe.frameborder = '0';

            // Append the iframe to the DOM or your desired container
            const container = document.getElementById('constitution-container');
            container.appendChild(iframe);
        }
    });

    // ... rest of your original script
</script>

<style>
    /* Your existing styles go here */

    #constitution-container {
        margin-top: 2em; /* Adjust the margin as needed */
        padding: 1em;
        border: 1px solid #ddd; /* Add a border for separation */
        border-radius: 8px; /* Optional: Add border radius for a rounded look */
        background-color: #f9f9f9; /* Optional: Add a light background color */
    }
</style>

<div class="constitution" id="constitution-container">
    <!-- Your existing content goes here -->

    <hr />

    <!-- Add a section for Google Docs embedding, if needed -->
    <h2 class="sectionHeading">Embedded Constitution</h2>
    <!-- The embedded Google Docs iframe will be appended here -->
</div>
