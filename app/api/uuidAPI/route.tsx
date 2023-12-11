import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const url = `https://api.mojang.com/users/profiles/minecraft/${id}`;
  const data = await fetch(url).then((res) => res.json());
  return NextResponse.json(data);
}
