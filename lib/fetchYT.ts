import { Video } from "@/components/latestVideos"

export async function getLatestVideos(): Promise<Video[]> {
  try {
    const latestVideos = [
      {
        thumbnail:
          "https://i.ytimg.com/vi/YbclYBh9n8I/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCKWUgtxeAUG2suznDkTeseZLgsEQ",
        index: 0,
        description:
          "Somewhat of a tutorial for how i go about animating the blocks in my videos.",
        id: "YbclYBh9n8I",
        title: "Block and block_display animations",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/p-TzJihKn1Q/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD8vlqOvR256K-lECYFg8aJ5zMkvw",
        index: 1,
        description:
          "1.20.6 added yet another format to display colors in Minecraft.",
        id: "p-TzJihKn1Q",
        title: "Why does Minecraft keep adding new color formats?",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/e0HM_vfSuDw/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCa7TSWZ8ixd6hEdoroeW92UfsRag",
        index: 2,
        description:
          "Talking about the pitfalls of averaging colors and how gamma and color space affects it.",
        id: "e0HM_vfSuDw",
        title: "How to average color",
      },
    ]
    return latestVideos
  } catch (error) {
    console.error("Error fetching latest videos:", error)
    return []
  }
}
