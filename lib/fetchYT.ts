import { Video } from "@/components/latestVideos"

export async function getLatestVideos(): Promise<Video[]> {
  try {
    const latestVideos = [
      {
        thumbnail:
          "https://i.ytimg.com/vi/p-TzJihKn1Q/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLD8vlqOvR256K-lECYFg8aJ5zMkvw",
        index: 0,
        description:
          "1.20.6 added yet another format to display colors in Minecraft.",
        id: "p-TzJihKn1Q",
        title: "Why does Minecraft keep adding new color formats?",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/e0HM_vfSuDw/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCa7TSWZ8ixd6hEdoroeW92UfsRag",
        index: 1,
        description:
          "Talking about the pitfalls of averaging colors and how gamma and color space affects it.",
        id: "e0HM_vfSuDw",
        title: "How to average color",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/khsviAjdjHg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcaNNax-rGxlVsyjrAe41_jNAoFw",
        index: 2,
        description:
          "I just wanted to check out if the new paintings are actually darker like everyone is saying.",
        id: "khsviAjdjHg",
        title: "Are the new 1.21 paintings really that dark?",
      },
    ]
    return latestVideos
  } catch (error) {
    console.error("Error fetching latest videos:", error)
    return []
  }
}
