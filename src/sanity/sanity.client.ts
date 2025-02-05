import { createClient } from "next-sanity";
import { ClientConfig } from "next-sanity";

const SanityClient:ClientConfig = {
    projectId: <string> process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: <string> process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion:"v2023-03-07",
    useCdn:false,
    token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,  // Use the token for create/update
}

export default createClient(SanityClient);