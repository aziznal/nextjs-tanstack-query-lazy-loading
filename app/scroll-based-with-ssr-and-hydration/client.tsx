"use client";

import Item, { ItemLoadingSkeleton } from "@/components/item";
import { PAGE_SIZE, SIMULATED_MAX } from "@/lib/constants";
import { useGetInfiniteItems } from "@/lib/use-get-infinite-items";
import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useRef } from "react";

export function HydratedInfiniteScrollPage() {
  const query = useGetInfiniteItems({
    pageSize: PAGE_SIZE,
    simulatedMax: SIMULATED_MAX,
  });

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window) return;

    const observer = new IntersectionObserver(
      (entries, _observer) => {
        const isIntersecting = entries[0].isIntersecting;

        if (!isIntersecting) return;

        if (!query.hasNextPage) return;

        if (query.isFetchingNextPage) return;

        query.fetchNextPage();
      },
      {
        threshold: 1.0,
      },
    );

    if (!loaderRef.current) return;

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [query]);

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
        Scroll-based (Intersection Observer)
      </h1>

      <ul className="flex flex-col items-center gap-4 w-full p-4 pb-12 border rounded-md h-[500px] overflow-y-auto">
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

        <div ref={loaderRef} className="text-center" />
      </ul>

      <div className="my-4">
        You are viewing {(query.data?.pages.length || 0) * PAGE_SIZE} of{" "}
        {SIMULATED_MAX} items
      </div>
    </div>
  );
}
