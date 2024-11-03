import "server-only";
import { defineLive } from "next-sanity";
import { client } from "@/sanity/lib/client"; 

export const {sanityFetch, SanityLive} = defineLive({
    client,
    
})



// src/sanity/lib/live.ts



/*
import { defineLive } from "next-sanity";
// import your local configured client
import { client } from "@/sanity/lib/client";
import { token } from "../env";
// set your viewer token

if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN")
}

// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
*/