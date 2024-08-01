import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { getLatestVideos } from "@/lib/fetchYT"
import { cn } from "@/lib/utils"

export type Video = {
  thumbnail: string
  index: number
  description: string
  id: string
  title: string
}

export function SkeletonVideos({ index }: { index: number }) {
  return (
    <div
      className={
        "card bg-base-200 md:col-span-1 md:block " +
        (index == 0 ? "block" : "hidden")
      }
    >
      <figure className="skeleton flex aspect-video items-center overflow-hidden" />
      <div className="card-body">
        <h2 className="card-title skeleton h-8" />
        <p className="skeleton h-3 w-11/12" />
        <p className="skeleton h-3" />
        <p className="skeleton h-3 w-3/4" />
        <div className="card-actions">
          <div className="btn skeleton text-opacity-0">
            Watch on YouTube <ExternalLink size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function LatestVideos() {
  const latestVideos: Video[] = await getLatestVideos()

  return (
    <>
      {latestVideos?.map((video: Video, index) => (
        <div
          key={video.id}
          className={cn(
            "card bg-base-200 md:col-span-1 md:block",
            index != 0 && "hidden"
          )}
        >
          <figure className="flex aspect-video items-center overflow-hidden">
            <Image
              src={video.thumbnail}
              width={1920}
              height={1080}
              alt={"Thumbnail for " + video.title}
              draggable={false}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{video.title}</h2>
            <p className="break-words">{video.description}</p>
            <div className="card-actions">
              <Link
                target="_blank"
                href={"https://youtube.com/watch?v=" + video.id}
                className="btn btn-neutral"
              >
                Watch on YouTube <ExternalLink size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
