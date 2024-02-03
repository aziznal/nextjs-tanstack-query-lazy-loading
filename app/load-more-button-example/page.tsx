"use client";

import Item, { ItemLoadingSkeleton } from "@/components/item";
import { Button } from "@/components/ui/button";
import { useGetInfiniteItems } from "@/lib/use-get-infinite-items";
import { Fragment, useRef } from "react";

const PAGE_SIZE = 5;

export default function LoadMoreButtonInfiniteScrollPage() {
  const query = useGetInfiniteItems({
    pageSize: PAGE_SIZE,
  });

  const itemListRef = useRef<HTMLDivElement>(null);

  const onLoadMoreButtonClick = () => {
    query.fetchNextPage();

    // scroll to the bottom of the list
    setTimeout(() => {
      itemListRef.current?.scrollTo({
        top: itemListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-fit mx-auto">
      <h1 className="font-bold text-2xl text-center mb-6">
        Load More Button Infinite Scroll Example
      </h1>

      <div
        className="flex flex-col items-center gap-4 overflow-y-auto max-h-[50%] w-full p-4 pb-12 border rounded-md"
        ref={itemListRef}
      >
        {query.data?.pages.map((page) => (
          <Fragment
            key={page.items
              .map((item) => item.id)
              .reduce((acc, next) => (acc += next))}
          >
            {page.items.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </Fragment>
        ))}

        {(query.isLoading || query.isFetchingNextPage) && (
          <>
            {new Array(PAGE_SIZE).fill(null).map((_, index) => (
              <ItemLoadingSkeleton key={index} />
            ))}
          </>
        )}

        {!query.isLoading && !query.isFetchingNextPage && (
          <Button onClick={onLoadMoreButtonClick} disabled={!query.hasNextPage}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
}
