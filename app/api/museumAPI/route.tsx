import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const data = await fetch(
    `https://api.hypixel.net/v2/skyblock/museum?key=${apiKey}&profile=${id}`
  );
  const valuetoreturn = await data.json();
  return NextResponse.json(valuetoreturn);
}
