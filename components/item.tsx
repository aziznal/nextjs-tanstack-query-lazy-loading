import { FakeItem } from "@/lib/fake-api/fake-api";
import { Skeleton } from "./ui/skeleton";

type ItemProps = {
  item: FakeItem;
};

export default function Item({ item }: ItemProps) {
  return (
    <div className="border-2 p-4 flex w-full rounded-md hover:bg-slate-800 transition-colors">
      {item.name}
    </div>
  );
}

export function ItemLoadingSkeleton() {
  return (
    <Skeleton className="border-2 p-4 flex w-full rounded-md hover:bg-slate-800 transition-colors h-[60px] shrink-0">
      <Skeleton className="w-[64px] h-4 bg-slate-600" />
    </Skeleton>
  );
}
