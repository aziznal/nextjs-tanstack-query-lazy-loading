import { fakeApi } from "@/lib/fake-api/fake-api";

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
