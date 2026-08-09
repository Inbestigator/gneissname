"use client";

import { IconExternalLink } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export interface Video {
  thumbnail: string;
  index: number;
  description: string;
  id: string;
  title: string;
}

const SkeletonVideo = () => (
  <div className="card not-first:not-sm:hidden bg-base-200 last:not-md:hidden">
    <figure className="skeleton flex aspect-video items-center overflow-hidden rounded-b-none" />
    <div className="card-body">
      <h2 className="card-title skeleton mt-0.75 mb-2.25 h-4.75">
        <span className="sr-only">Loading video title</span>
      </h2>
      <p className="skeleton mb-px h-3.25" />
      <p className="skeleton mb-px h-3.25" />
      <p className="skeleton mb-0.5 h-3.25 w-3/4" />
      <div className="card-actions">
        <div className="btn btn-neutral btn-disabled">
          <div className="btn border-0 p-0 opacity-0">
            Watch on YouTube <IconExternalLink className="size-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

function decodeHtmlEntities(v: string) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = v;
  return textArea.value;
}

export default function LatestVideos() {
  const { data } = useQuery({
    queryKey: ["videos"],
    async queryFn(): Promise<Video[]> {
      const response = await fetch("/api/videos", { next: { revalidate: 60 * 60 } });
      return response.json();
    },
  });

  if (!data?.length) {
    return (
      <>
        <SkeletonVideo />
        <SkeletonVideo />
        <SkeletonVideo />
      </>
    );
  }

  return data.map((video) => (
    <div key={video.id} className="card not-first:not-sm:hidden bg-base-200 last:not-md:hidden">
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
        <p className="wrap-break-word line-clamp-3">{decodeHtmlEntities(video.description)}</p>
        <div className="card-actions">
          <Link target="_blank" href={`https://youtube.com/watch?v=${video.id}`} className="btn btn-neutral">
            Watch on YouTube <IconExternalLink className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  ));
}
