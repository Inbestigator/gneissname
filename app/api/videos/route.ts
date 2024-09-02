import { NextResponse } from "next/server"

import { Video } from "@/components/latest-videos"

export async function GET() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCCk6atPf8zBPd-5C7rgEkRg&maxResults=3&order=date&type=video&key=${process.env.YOUTUBE_API_KEY}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()

    const videos: Video[] = data.items.map((item: any, index: number) => ({
      thumbnail: item.snippet.thumbnails.high.url,
      index,
      description: item.snippet.description,
      id: item.id.videoId,
      title: item.snippet.title,
    }))

    return NextResponse.json(videos)
  } catch (e) {
    return NextResponse.json({ error: "Error fetching video" }, { status: 500 })
  }
}
