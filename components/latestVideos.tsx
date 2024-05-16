"use client"

import React, { useEffect, useState } from "react"
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

import { Skeleton } from "./ui/skeleton"

export type Video = {
  thumbnail: string
  index: number
  description: string
  id: string
  title: string
}

interface Request<T> {
  loading?: boolean
  error?: Error
  result?: T
}

const requestLoading = Object.freeze({ loading: true })

const useFetchVideos = (): Request<Video[]> => {
  const [latestVideos, setLatestVideos] =
    useState<Request<Video[]>>(requestLoading)

  useEffect(() => {
    let canceled = false

    setLatestVideos(requestLoading)
    getLatestVideos().then(
      (result) => {
        if (!canceled) {
          setLatestVideos({ result })
        }
      },
      (error) => {
        if (!canceled) {
          setLatestVideos({ error })
        }
      }
    )

    return () => {
      canceled = true
    }
  }, [])

  return latestVideos
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
          <Skeleton className="h-[30px] w-[300px]" />
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default function LatestVideos() {
  const latestVideos: Request<Video[]> = useFetchVideos()

  if (latestVideos.loading) {
    return (
      <>
        <SkeletonVideos index={0} />
        <SkeletonVideos index={1} />
        <SkeletonVideos index={2} />
      </>
    )
  }

  if (latestVideos.error) {
    console.error(latestVideos.error.message)
    return
  }

  return (
    <>
      {latestVideos.result?.map((video: Video) => (
        <Card
          key={video.id}
          className={"md:col-span-1 md:block " + (video.index == 0 ? "block" : "hidden")}
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
