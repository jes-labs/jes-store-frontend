import { PinataSDK } from "pinata"

// Client-side Pinata instance — no JWT needed since uploads go through signed URLs
export const pinataClient = new PinataSDK({
  pinataJwt: "",
  pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL!,
})
