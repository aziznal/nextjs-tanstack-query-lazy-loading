import { NextRequest, NextResponse } from "next/server";
import { getItems } from "./get-items";

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getItems({
      count: +req.nextUrl.searchParams.get("count")!,
      cursor: +req.nextUrl.searchParams.get("cursor")!,
      simulatedMax: +req.nextUrl.searchParams.get("simulatedMax")!,
    }),
  );
}
