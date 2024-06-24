import { Video } from "@/components/latestVideos"

export async function getLatestVideos(): Promise<Video[]> {
  try {
    const latestVideos = [
      {
        thumbnail:
          "https://i.ytimg.com/vi/UqA_bVS7IV8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBZUfZHmdTMlMuyPuINtbg9XUymGA",
        index: 0,
        description:
          "My discord community setup a server to play together on and I wanted to setup a base on it.",
        id: "UqA_bVS7IV8",
        title: "The Gneiss Community Server SMP #01",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/YbclYBh9n8I/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCKWUgtxeAUG2suznDkTeseZLgsEQ",
        index: 1,
        description:
          "Somewhat of a tutorial for how i go about animating the blocks in my videos.",
        id: "YbclYBh9n8I",
        title: "Block and block_display animations",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/p-TzJihKn1Q/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD8vlqOvR256K-lECYFg8aJ5zMkvw",
        index: 2,
        description:
          "1.20.6 added yet another format to display colors in Minecraft.",
        id: "p-TzJihKn1Q",
        title: "Why does Minecraft keep adding new color formats?",
      },
    ]
    return latestVideos
  } catch (error) {
    console.error("Error fetching latest videos:", error)
    return []
  }
}
