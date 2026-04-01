import { NextResponse, type NextRequest } from "next/server"

export const dynamic = "force-dynamic"

/**
 * POST /api/upload-url
 * Accepts a file via multipart form, pins it to IPFS via Pinata,
 * and returns the public gateway URL.
 */
export async function POST(request: NextRequest) {
  try {
    const form = await request.formData()
    const file = form.get("file") as File | null
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const pinataForm = new FormData()
    pinataForm.append("file", file)

    const jwt = process.env.PINATA_JWT || process.env.NEXT_PUBLIC_PINATA_JWT
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: pinataForm,
    })

    if (!res.ok) {
      const err = await res.text()
      console.error("Pinata error:", err)
      return NextResponse.json({ error: "Pinata upload failed" }, { status: 500 })
    }

    const data = await res.json()
    const cid = data.IpfsHash
    const url = `https://ipfs.io/ipfs/${cid}`

    return NextResponse.json({ url, cid }, { status: 200 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
