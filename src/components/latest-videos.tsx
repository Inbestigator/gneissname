"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

export type Video = {
  thumbnail: string;
  index: number;
  description: string;
  id: string;
  title: string;
};

export function SkeletonVideos({ index }: { index: number }) {
  return (
    <div
      className={
        "card bg-base-200 md:col-span-1 md:block " +
        (index == 0 ? "block" : "hidden")
      }
    >
      <figure className="skeleton flex aspect-video items-center overflow-hidden rounded-b-none" />
      <div className="card-body">
        <h2 className="card-title skeleton mb-3 h-6" />
        <p className="skeleton mb-1 h-4" />
        <p className="skeleton mb-1 h-4" />
        <p className="skeleton mb-1 h-4 w-3/4" />
        <div className="card-actions">
          <div className="btn skeleton text-opacity-0">
            Watch on YouTube <ExternalLink size={18} />
          </div>
        </div>
      </div>
    </div>
  );
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

  if (isPending || isError) {
    return (
      <>
        <SkeletonVideos index={0} />
        <SkeletonVideos index={1} />
        <SkeletonVideos index={2} />
      </>
    );
  }

  function decodeHtmlEntities(v: string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = v;
    return textArea.value;
  }

  return (
    <>
      {data?.map((video: Video, index: number) => (
        <div
          key={video.id}
          className={cn(
            "card bg-base-200 md:block",
            index < 2 && "sm:block",
            index != 0 && "hidden",
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
            <h2 className="card-title">{decodeHtmlEntities(video.title)}</h2>
            <p className="break-words">
              {decodeHtmlEntities(video.description)}
            </p>
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
  );
}
