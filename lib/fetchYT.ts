import fs from "fs"

import { Video } from "@/components/latestVideos"

export async function getLatestVideos(): Promise<Video[]> {
  let latestVideos: Video[] = []

  try {
    latestVideos = await fetchLatestVideos()
  } catch (error) {
    try {
      latestVideos = await loadSavedVideos()
    } catch (error) {
      return []
    }
  }

  return latestVideos
}

async function fetchLatestVideos(): Promise<Video[]> {
  const url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCCk6atPf8zBPd-5C7rgEkRg&maxResults=3&order=date&type=video&key=AIzaSyA_TRfGdlyKcpwc550xhh6ZWhmmcr1exFo"

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

  await writeVideosToFile(videos)

  return videos
}

async function writeVideosToFile(videos: Video[]): Promise<void> {
  const jsonContent = JSON.stringify(videos, null, 2)
  await fs.promises.writeFile("latestVideos.json", jsonContent)
}

async function loadSavedVideos(): Promise<Video[]> {
  const data = await fs.promises.readFile("latestVideos.json", "utf8")
  const savedVideos: Video[] = JSON.parse(data)
  return savedVideos
}
