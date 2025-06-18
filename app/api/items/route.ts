import { fakeApi } from "@/lib/fake-api/fake-api";
import { NextRequest, NextResponse } from "next/server";

export async function getItems(args: {
  count: number;
  cursor: number;
  simulatedMax: number;
}) {
  const { items, nextCursor } = await fakeApi.getItems({
    count: args.count,
    cursor: args.cursor,
    fakeDelay: 1000,
  });

  return {
    items,
    nextCursor:
      args.cursor + args.count < args.simulatedMax ? nextCursor : null,
  };
}

export async function GET(req: NextRequest) {
  return NextResponse.json(
    await getItems({
      count: +req.nextUrl.searchParams.get("count")!,
      cursor: +req.nextUrl.searchParams.get("cursor")!,
      simulatedMax: +req.nextUrl.searchParams.get("simulatedMax")!,
    }),
  );
}
