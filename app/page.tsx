import Link from "next/link"

import { siteConfig } from "@/config/site"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import BentoGrid from "@/components/ui/bento-grid"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import LatestVideos from "@/components/latestVideos"

export default function IndexPage() {
  return (
    <>
      <section className="container flex flex-col gap-4 pb-8 pt-6 md:py-10">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <h1 className="text-[max(30px,min(5vw,60px))] font-extrabold leading-tight tracking-tighter">
            Gneissname
          </h1>
          <p className="max-w-full text-lg text-muted-foreground md:max-w-[800px] md:text-xl">
            I&apos;m a geologist and YouTuber who likes to make things.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.youtube}
            className={buttonVariants()}
          >
            YouTube
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.discord}
            className={buttonVariants()}
          >
            Discord
          </Link>
        </div>
      </section>

      <BentoGrid className="md:grid-cols-3">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>About me</CardTitle>
            <CardDescription>
              I try to explain geological concepts and other topics of interest
              to me in an understandable and fun way through the lens of
              Minecraft. Join my loyal &quot;gnerds&quot; and let&apos;s have
              some fun!
            </CardDescription>
          </CardHeader>
        </Card>
        <LatestVideos />
      </BentoGrid>
    </>
  )
}
