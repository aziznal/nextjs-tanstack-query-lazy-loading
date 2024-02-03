import { FakeItem } from "@/lib/fake-api/fake-api";
import { Skeleton } from "./ui/skeleton";

type ItemProps = {
  item: FakeItem;
};

export default function Item({ item }: ItemProps) {
  return (
    <div className="border-2 p-4 flex w-full rounded-md hover:bg-slate-100 transition-colors">
      {item.name}
    </div>
  );
}

export function ItemLoadingSkeleton() {
  return (
    <Skeleton className="border-2 p-4 flex w-full rounded-md hover:bg-slate-100 transition-colors">
      <Skeleton className="w-[64px] h-4 bg-gray-300 rounded-md animate-pulse" />
    </Skeleton>
  );
}
