import { Suspense } from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import BentoGrid from "@/components/bento-grid"
import LatestVideos, { SkeletonVideos } from "@/components/latest-videos"

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

      <BentoGrid className="md:grid-cols-3">
        <div className="card bg-base-200 md:col-span-3">
          <div className="card-body">
            <h2 className="card-title">About me</h2>
            <p>
              I try to explain geological concepts and other topics of interest
              to me in an understandable and fun way through the lens of
              Minecraft. Join my loyal &quot;gnerds&quot; and let&apos;s have
              some fun!
            </p>
          </div>
        </div>
        <Suspense
          fallback={
            <>
              <SkeletonVideos index={0} />
              <SkeletonVideos index={1} />
              <SkeletonVideos index={2} />
            </>
          }
        >
          {/* @ts-ignore*/}
          <LatestVideos />
        </Suspense>
      </BentoGrid>
    </>
  )
}
