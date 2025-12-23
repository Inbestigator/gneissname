"use client";

import { IconExternalLink } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export type Video = {
  thumbnail: string;
  index: number;
  description: string;
  id: string;
  title: string;
};

export function SkeletonVideos({ index }: Readonly<{ index: number }>) {
  return (
    <div className={`card bg-base-200 md:col-span-1 md:block ${index === 0 ? "block" : "hidden"}`}>
      <figure className="skeleton flex aspect-video items-center overflow-hidden rounded-b-none" />
      <div className="card-body">
        <h2 className="card-title skeleton mb-3 h-6">
          <span className="sr-only">Loading video title</span>
        </h2>
        <p className="skeleton mb-1 h-4" />
        <p className="skeleton mb-1 h-4" />
        <p className="skeleton mb-1 h-4 w-3/4" />
        <div className="card-actions">
          <div className="btn skeleton text-transparent">
            Watch on YouTube <IconExternalLink className="size-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function decodeHtmlEntities(v: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = v;
  return textArea.value;
}

export default function LatestVideos() {
  const { isPending, isError, data } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos", {
        next: { revalidate: 60 * 60 },
      });
      return await response.json();
    },
  });

  if (isPending || isError || !data?.length) {
    return (
      <>
        <SkeletonVideos index={0} />
        <SkeletonVideos index={1} />
        <SkeletonVideos index={2} />
      </>
    );
  }

  return (
    <>
      {data.map((video: Video, index: number) => (
        <div
          key={video.id}
          className={cn("card bg-base-200 md:block", index < 2 && "sm:block", index !== 0 && "hidden")}
        >
          <figure className="flex aspect-video items-center overflow-hidden">
            <Image
              src={video.thumbnail}
              width={1920}
              height={1080}
              alt={`Thumbnail for ${video.title}`}
              draggable={false}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{decodeHtmlEntities(video.title)}</h2>
            <p className="wrap-break-word">{decodeHtmlEntities(video.description)}</p>
            <div className="card-actions">
              <Link target="_blank" href={`https://youtube.com/watch?v=${video.id}`} className="btn btn-neutral">
                Watch on YouTube <IconExternalLink className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
