"use client";

import { LucideGithub } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-8 sm:flex-row">
      <LazyLoadingType link="/load-more-button-example">
        {`"Load More"`} button
      </LazyLoadingType>

      <LazyLoadingType link="/scroll-based-example">
        Scroll-based
      </LazyLoadingType>

      <footer className="absolute bottom-8">
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
      onClick={() => location.assign(props.link)}
      className="border h-[200px] w-[200px] rounded-md p-2 flex items-center justify-center hover:bg-slate-100 transition-colors select-none cursor-pointer font-bold"
    >
      {props.children}
    </div>
  );
};
