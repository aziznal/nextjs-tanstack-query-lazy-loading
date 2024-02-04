import { fakeApi } from "@/lib/fake-api/fake-api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const cursor = Number(searchParams.get("cursor"));
  const count = Number(searchParams.get("count"));
  const simulatedMaxItems = Number(searchParams.get("simulatedMax"));

  const { items, nextCursor } = await fakeApi.getItems({
    count,
    cursor,
    fakeDelay: 1000,
  });

  return NextResponse.json({
    items,
    nextCursor: cursor + count < simulatedMaxItems ? nextCursor : null,
  });
}
