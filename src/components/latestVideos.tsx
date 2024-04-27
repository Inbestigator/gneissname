import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getLatestVideos } from "@/lib/fetchYT";
import { Skeleton } from "./ui/skeleton";
import { ExternalLink } from "lucide-react";

export type Video = {
  thumbnail: string;
  index: number;
  description: string;
  id: string;
  title: string;
};

interface Request<T> {
  loading?: boolean;
  error?: Error;
  result?: T;
}

const requestLoading = Object.freeze({ loading: true });

const useFetchVideos = (): Request<Video[]> => {
  const [latestVideos, setLatestVideos] =
    useState<Request<Video[]>>(requestLoading);

  useEffect(() => {
    let canceled = false;

    setLatestVideos(requestLoading);
    getLatestVideos().then(
      (result) => {
        if (!canceled) {
          setLatestVideos({ result });
        }
      },
      (error) => {
        if (!canceled) {
          setLatestVideos({ error });
        }
      }
    );

    return () => {
      canceled = true;
    };
  }, []);

  return latestVideos;
};

export function SkeletonVideos({ index }: { index: number }) {
  return (
    <Card className={"md:block " + (index == 0 ? "block" : "hidden")}>
      <Skeleton className="rounded-t-lg rounded-b-none">
        <Image
          src={"/cdn/holderThumbnail.png"}
          width={1920}
          height={1080}
          className="overflow-hidden rounded-t-lg invisible aspect-[16/9]"
          alt={"Skeleton thumbnail"}
          draggable={false}
        />
      </Skeleton>
      <Skeleton className="w-full rounded-t-lg rounded-b-none" />
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[300px] h-[30px]" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default function LatestVideos() {
  const latestVideos: Request<Video[]> = useFetchVideos();

  if (latestVideos.loading) {
    return (
      <div className="flex flex-col md:flex-row gap-4">
        <SkeletonVideos index={0} />
        <SkeletonVideos index={1} />
        <SkeletonVideos index={2} />
      </div>
    );
  }

  if (latestVideos.error) {
    console.error(latestVideos.error.message);
    return;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {latestVideos.result?.map((video: Video) => (
        <Card
          key={video.id}
          className={"md:block " + (video.index == 0 ? "block" : "hidden")}
        >
          <Image
            src={video.thumbnail}
            width={1920}
            height={1080}
            className="overflow-hidden rounded-t-lg"
            alt={"Thumbnail for " + video.title}
            draggable={false}
          />
          <CardHeader>
            <CardTitle>{video.title}</CardTitle>
            <CardDescription>{video.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <Link href={"https://youtube.com/watch?v=" + video.id}>
                Watch on YouTube <ExternalLink className="ml-2 scale-75" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
