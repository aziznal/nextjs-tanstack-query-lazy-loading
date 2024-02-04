import { useInfiniteQuery } from "@tanstack/react-query";
import { FakeItem } from "./fake-api/fake-api";

export const useGetInfiniteItems = ({
  pageSize,
  simulatedMax,
}: {
  pageSize: number;
  simulatedMax: number;
}) =>
  useInfiniteQuery<{ items: FakeItem[]; nextCursor: number }>({
    queryKey: ["infinite-items"],
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    queryFn: async ({ pageParam }) => {
      const items = await fetch(
        `/api/items?count=${pageSize}&cursor=${pageParam}&simulatedMax=${simulatedMax}`
      ).then((res) => res.json());

      return items;
    },
  });
