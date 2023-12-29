import { NextResponse } from "next/server";

/**
 * GET handler for profile API route.
 *
 * Fetches a Hypixel Skyblock player profile by UUID.
 *
 * - Parses 'id' query parameter from request URL for UUID.
 * - Fetches profile data from Hypixel API using API key.
 * - Returns JSON response with profile data.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const data = await fetch(
    `https://api.hypixel.net/v2/skyblock/profiles?key=${apiKey}&uuid=${id}`
  );
  const valuetoreturn = await data.json();
  return NextResponse.json({ valuetoreturn });
}
