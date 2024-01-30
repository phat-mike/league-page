import { getGoogDocEmbedLink } from "$lib/utils/helper";

export async function load() {
    const embedLink = getGoogDocEmbedLink();

    return {
        embedLink,
    };
}