"use client";

import Item, { ItemLoadingSkeleton } from "@/components/item";
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
    <div className="flex flex-col items-center justify-center min-h-[100dvh] mx-auto w-full sm:w-[500px] py-24">
      <Link className="fixed top-12 left-12 hover:underline" href="/">
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
            {new Array(PAGE_SIZE).fill(null).map((_, index) => (
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

      <div className="w-full border mt-12 rounded-md text-xs p-2">
        <h2 className="font-bold">Notes</h2>

        <ul className="list-decimal pl-4 flex flex-col gap-1 pt-2">
          <li>
            Read the{" "}
            <Link
              href="https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries"
              target="_blank"
            >
              docs
            </Link>
          </li>

          <li>
            Lazy loading is a <i>client-side</i> illusion. {`It's`} just sending
            requests for the next data as the user progresses in the app.
          </li>

          <li>
            page means a bunch of items, not a page in the traditional sense.
          </li>

          <li>page size is the number of items per page.</li>

          <li>
            Having an API that supports the parameters necesssary for lazy
            loading makes a lot of work trivial.
          </li>

          <li>
            {`Tanstack's`} <code>useInfiniteQuery</code> is a great tool for
            this on the client.
          </li>

          <li>
            API receives:
            <ul className="list-disc pl-4 pt-1">
              <li>
                <code>cursor</code> (a.k.a offset) the starting point of the
                next page
              </li>

              <li>
                <code>count</code> (a.k.a pageSize) how many items to return
              </li>
            </ul>
          </li>

          <li>
            API sends back:
            <ul className="list-disc pl-4 pt-1">
              <li>
                <code>items</code> list for the requested page
              </li>

              <li>
                <code>nextCursor</code> to be used in the next request if there
                is a next page, otherwise <code>null</code> or{" "}
                <code>undefined</code>
              </li>

              <li>
                <code>totalItems</code> (optional) to know when to stop
                requesting more items on the client
              </li>
            </ul>
          </li>

          <li>
            Client stores all pages received so far and appends new pages to
            that list when new pages are fetched.
          </li>

          <li>
            Always let the user feel they know {`what's`} happening (with
            loading indicators, for example)
          </li>

          <li>
            Showing some sort of indication of the max items helps ground the{" "}
            {`"infinity"`}
            of the situation, improving UX.
          </li>
        </ul>
      </div>
    </div>
  );
}
