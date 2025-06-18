import { getInfiniteItemsQueryOptions } from "@/lib/use-get-infinite-items";
import { getItems } from "../api/items/route";
import { HydratedInfiniteScrollPage } from "./client";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { PAGE_SIZE, SIMULATED_MAX } from "@/lib/constants";

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    ...getInfiniteItemsQueryOptions,
    queryFn: () =>
      getItems({
        simulatedMax: SIMULATED_MAX,
        cursor: 0,
        count: PAGE_SIZE,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HydratedInfiniteScrollPage />
    </HydrationBoundary>
  );
}
