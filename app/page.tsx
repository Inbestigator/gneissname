import Link from "next/link"

import { siteConfig } from "@/config/site"
import LatestVideos from "@/components/latest-videos"

export default function IndexPage() {
  return (
    <>
      <div className="container flex flex-col gap-4 pb-8 pt-6 md:py-10">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-[max(30px,min(5vw,60px))] font-extrabold leading-tight tracking-tighter">
            Gneissname
          </h1>
          <p className="text-muted-foreground max-w-full text-lg md:max-w-[800px] md:text-xl">
            I&apos;m a geologist and YouTuber who likes to make things.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.youtube}
            className="btn btn-primary flex-1 md:flex-none"
          >
            YouTube
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.discord}
            className="btn btn-outline flex-1 md:flex-none"
          >
            Discord
          </Link>
        </div>
      </div>

      <div className="container grid w-full gap-4 md:grid-cols-3">
        <LatestVideos />
      </div>
    </>
  )
}
