import { IconArrowUpRight } from "@tabler/icons-react";
import Link from "next/link";
import LatestVideos from "@/components/latest-videos";

export default function IndexPage() {
  return (
    <>
      <section className="mb-8 flex flex-col gap-6">
        <header className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="font-extrabold text-4xl tracking-tighter sm:text-7xl">Gneissname</h1>
          <p className="max-w-full text-lg text-muted-foreground md:max-w-200 md:text-xl">
            I&apos;m a geologist and YouTuber who likes to make things.
          </p>
        </header>
        <Link href="https://shop.gneiss.name" className="btn btn-dash group relative mx-auto w-fit">
          Check out the Gneiss shop! <IconArrowUpRight className="ml-2" />
          <div className="absolute -top-4 -right-4 size-8 rounded-full bg-[radial-gradient(white_30%,transparent_100%)] group-hover:hidden" />
          <div className="absolute -top-2 -right-2 size-4 animate-ping rounded-full bg-red-100 p-1 group-hover:hidden">
            <div className="size-full rounded-full bg-red-600" />
          </div>
        </Link>
      </section>
      <section className="grid w-full gap-4 sm:grid-cols-2 md:grid-cols-3">
        <LatestVideos />
      </section>
    </>
  );
}
