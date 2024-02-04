"use client";

import Item, { ItemLoadingSkeleton } from "@/components/item";
import Notes from "@/components/notes";
import { Button } from "@/components/ui/button";
import { useGetInfiniteItems } from "@/lib/use-get-infinite-items";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { Fragment, useRef } from "react";

const PAGE_SIZE = 5;
const SIMULATED_MAX = 20;

export default function LoadMoreButtonInfiniteScrollPage() {
  const query = useGetInfiniteItems({
    pageSize: PAGE_SIZE,
    simulatedMax: SIMULATED_MAX,
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
    <div className="flex flex-col items-center justify-center min-h-[100dvh] mx-auto w-full sm:w-[500px] py-24 px-4">
      <Link
        className="absolute top-4 left-4 sm:fixed sm:top-12 sm:left-12 hover:underline"
        href="/"
      >
        <LucideArrowLeft size="42" />
      </Link>

      <h1 className="font-bold text-2xl text-center mb-6">
        Lazy Loading Example <br />
        Load More Button
      </h1>

      <div
        className="flex flex-col items-center gap-4 w-full p-4 pb-12 border rounded-md h-[500px] overflow-y-auto"
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
            {new Array(2).fill(null).map((_, index) => (
              <ItemLoadingSkeleton key={index} />
            ))}
          </>
        )}
      </div>

      <div className="my-4">
        You are viewing {(query.data?.pages.length || 0) * PAGE_SIZE} of{" "}
        {SIMULATED_MAX} items
      </div>

      <Button
        onClick={onLoadMoreButtonClick}
        disabled={
          !query.hasNextPage || query.isLoading || query.isFetchingNextPage
        }
      >
        Load More
      </Button>

      <Notes />
    </div>
  );
}
