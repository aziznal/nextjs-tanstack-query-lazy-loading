import { LucideArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Notes() {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-full mx-auto w-full sm:w-[500px]">
      <Link
        className="absolute top-4 left-4 sm:fixed sm:top-12 sm:left-12 hover:underline"
        href="/"
      >
        <LucideArrowLeft size="42" />
      </Link>

      <div className="w-full border mt-12 rounded-md text-xs p-4">
        <h2 className="font-bold">Notes</h2>

        <ul className="list-decimal pl-4 flex flex-col gap-4 pt-2">
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

          <li>
            Making the loading skeletons have the exact same size as the items
            themselves makes things look much smoother. Though it may not always
            be possible.
          </li>
        </ul>
      </div>
    </div>
  );
}
