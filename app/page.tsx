"use client";

import {
  LucideEye,
  LucideGithub,
  LucideMemoryStick,
  LucideMouse,
  LucideMousePointerClick,
  LucideNotebookPen,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center w-full p-4 sm:w-[500px] mx-auto">
      <h1 className="text-3xl font-bold mb-4">Lazy Loading</h1>

      <section className="mb-8 text-sm text-center text-slate-600 flex flex-col gap-3 [&_*]:inline">
        <p>
          Lazy loading is a technique for preventing a ginormous amount of data
          from flooding your {`user's`} eyes <LucideEye size={16} /> and their{" "}
          {`device's `} memory <LucideMemoryStick size={16} />
        </p>

        <p>
          The word <strong>lazy</strong> in the software world usually refers to
          something being loaded / executed right when {`it's`} needed.
        </p>

        <p>Below you can find two examples of this behavior:</p>
      </section>

      <div className="flex flex-col justify-center items-center gap-8 sm:flex-row">
        <LazyLoadingType link="/load-more-button-example">
          <LucideMousePointerClick size={36} />
          <span>{`"Load More"`} button</span>
        </LazyLoadingType>

        <LazyLoadingType link="/scroll-based-example">
          <LucideMouse size={36} />
          <span>Scroll-based</span>
        </LazyLoadingType>
      </div>

      <Link href="/notes">
        <div className="mt-8 text-xs flex gap-1 items-center">
          notes
          <LucideNotebookPen size={16} />
        </div>
      </Link>

      <footer className="py-8 sm:absolute bottom-8">
        <span>Feb 2024 - Made by</span>

        <a
          href="https://github.com/aziznal/nextjs-tanstack-query-lazy-loading"
          target="_blank"
          className="mx-1 inline-flex gap-1 font-bold text-rose-600"
        >
          aziznal <LucideGithub />
        </a>
      </footer>
    </div>
  );
}

type LazyLoadingTypeProps = {
  children: React.ReactNode;
  link: string;
};

const LazyLoadingType = (props: LazyLoadingTypeProps) => {
  return (
    <div
      tabIndex={1}
      onClick={() => location.assign(props.link)}
      onKeyDown={(event) => {
        // enter or space goes does the same thing as clicking
        if (event.key === "Enter" || event.key === " ") {
          location.assign(props.link);
        }
      }}
      className="border h-[200px] w-[200px] rounded-md p-2 flex items-center justify-center hover:bg-slate-100 transition-colors select-none cursor-pointer font-bold flex-col gap-2"
    >
      {props.children}
    </div>
  );
};
