import { ignoredAccessories } from "@/constants/accessories";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const accData = await fetch(
    `https://api.hypixel.net/v2/resources/skyblock/items`,
    { cache: "force-cache" }
  ).then((res) => res.json());
  const accs = (accData["items"] as []).filter(
    (acc) =>
      acc["category"] === "ACCESSORY" && !ignoredAccessories.includes(acc["id"])
  );
  return NextResponse.json({ accs });
}
