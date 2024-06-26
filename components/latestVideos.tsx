import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { getLatestVideos } from "@/lib/fetchYT"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { AspectRatio } from "./ui/aspect-ratio"
import { Skeleton } from "./ui/skeleton"

export type Video = {
  thumbnail: string
  index: number
  description: string
  id: string
  title: string
}

export function SkeletonVideos({ index }: { index: number }) {
  return (
    <Card
      className={"md:col-span-1 md:block " + (index == 0 ? "block" : "hidden")}
    >
      <Skeleton className="rounded-b-none rounded-t-lg">
        <Image
          src={"/cdn/holderThumbnail.png"}
          width={1920}
          height={1080}
          className="invisible aspect-[16/9] overflow-hidden rounded-t-lg"
          alt={"Skeleton thumbnail"}
          draggable={false}
        />
      </Skeleton>
      <Skeleton className="w-full rounded-b-none rounded-t-lg" />
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-[30px]" />
        </CardTitle>
        <CardDescription className="space-y-1">
          <Skeleton className="h-[10px]" />
          <Skeleton className="h-[10px]" />
          <Skeleton className="h-[10px] w-3/4" />
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default async function LatestVideos() {
  const latestVideos: Video[] = await getLatestVideos()

  return (
    <>
      {latestVideos?.map((video: Video) => (
        <Card
          key={video.id}
          className={
            "md:col-span-1 md:block " + (video.index == 0 ? "block" : "hidden")
          }
        >
          <AspectRatio
            className="flex items-center overflow-hidden rounded-t-lg"
            ratio={16 / 9}
          >
            <Image
              src={video.thumbnail}
              width={1920}
              height={1080}
              alt={"Thumbnail for " + video.title}
              draggable={false}
            />
          </AspectRatio>
          <CardHeader>
            <CardTitle>{video.title}</CardTitle>
            <CardDescription>{video.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link
                target="_blank"
                href={"https://youtube.com/watch?v=" + video.id}
              >
                Watch on YouTube <ExternalLink className="ml-2 scale-75" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}
