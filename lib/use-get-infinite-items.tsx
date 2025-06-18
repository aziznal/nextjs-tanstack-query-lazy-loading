import {
  infiniteQueryOptions,
  useInfiniteQuery
} from "@tanstack/react-query";
import { FakeItem } from "./fake-api/fake-api";

export const itemsKeyFactory = {
  all: ["items"],
  items: () => [...itemsKeyFactory.all] as const,
} as const;

export const getInfiniteItemsQueryOptions = infiniteQueryOptions<{
  items: FakeItem[];
  nextCursor: number | null;
}>({
  queryKey: itemsKeyFactory.items(),
  initialPageParam: 0,
  getNextPageParam: (lastPage, _pages) => lastPage.nextCursor,
});

export const useGetInfiniteItems = ({
  pageSize,
  simulatedMax,
}: {
  pageSize: number;
  simulatedMax: number;
}) =>
  useInfiniteQuery({
    ...getInfiniteItemsQueryOptions,
    queryFn: async ({ pageParam }) => {
      return fetch(
        `/api/items?count=${pageSize}&cursor=${pageParam}&simulatedMax=${simulatedMax}`,
      ).then((res) => res.json());
    },
  });
