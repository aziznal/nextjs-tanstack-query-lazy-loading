import { useInfiniteQuery } from "@tanstack/react-query";
import { FakeItem } from "./fake-api/fake-api";

export const useGetInfiniteItems = () =>
  useInfiniteQuery<{ items: FakeItem[]; nextCursor: number }>({
    queryKey: ["infinite-items"],
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    queryFn: async ({ pageParam }) => {
      const items = await fetch(`/items?count=20&cursor=${pageParam}`).then(
        (res) => res.json()
      );

      return items;
    },
  });
