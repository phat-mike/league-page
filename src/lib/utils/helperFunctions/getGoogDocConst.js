import { google } from 'googleapis';
import { constitutionFileID } from '$lib/utils/leagueInfo';

// Function to fetch document metadata and extract the embeddable link
const getGoogDocEmbedLink = async () => {
    // Load Google Cloud service account creds from Vercel env var
    const GOOGLE_APPLICATION_CREDENTIALS = import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS; 

    // Use the service account credentials
    const credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);

    // Set up read-only auth
    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/documents.readonly'],
    });

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
        console.error('Error requesting Google Doc from API:', error);
    }

    return embedLink;
};

// onMount(async () => {
//     console.log('Constitution onMount triggered');
//     await getGoogDocEmbedLink();

//     if (embedLink) {
//         // Embed the document on your site using the obtained link
//         const iframe = document.createElement('iframe');
//         iframe.src = embedLink;
//         iframe.width = '600';
//         iframe.height = '780';
//         iframe.frameborder = '0';

//         // Append the iframe to the DOM or your desired container
//         const container = document.getElementById('g-doc-constitution');
//         container.appendChild(iframe);
//     }
// });
