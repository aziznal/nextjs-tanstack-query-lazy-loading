"use client";

import { Button } from "@/components/ui/button";
import { useGetInfiniteItems } from "@/lib/use-get-infinite-items";
import { Fragment } from "react";

export default function LoadMoreButtonInfiniteScrollPage() {
  const query = useGetInfiniteItems();

  console.log(query.data);

  return (
    <div>
      {query.data?.pages.map((page) => (
        <Fragment
          key={page.items
            .map((item) => item.id)
            .reduce((acc, next) => (acc += next))}
        >
          {page.items.map((item) => (
            <div key={item.id}>{item.name}</div>
          ))}
        </Fragment>
      ))}

      {query.isLoading && <div>Loading...</div>}

      {!query.isLoading && <Button onClick={() => query.fetchNextPage()}>Load More</Button>}
    </div>
  );
}
