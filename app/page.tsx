import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-8 sm:flex-row">
      <LazyLoadingType link="/load-more-button-example">
        {`"Load More"`} button
      </LazyLoadingType>

      <LazyLoadingType link="/scroll-based-example">
        Scroll-based
      </LazyLoadingType>
    </div>
  );
}

type LazyLoadingTypeProps = {
  children: React.ReactNode;
  link: string;
};

const LazyLoadingType = (props: LazyLoadingTypeProps) => {
  return (
    <Link href={props.link}>
      <div className="border h-[200px] w-[200px] rounded-md p-2 flex items-center justify-center hover:bg-slate-100 transition-colors select-none cursor-pointer font-bold">
        {props.children}
      </div>
    </Link>
  );
};
