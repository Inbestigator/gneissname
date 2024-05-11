import { Video } from "@/components/latestVideos";

export async function getLatestVideos(): Promise<Video[]> {
  try {
    const latestVideos = [
      {
        thumbnail:
          "https://i.ytimg.com/vi/e0HM_vfSuDw/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCa7TSWZ8ixd6hEdoroeW92UfsRag",
        index: 0,
        description:
          "Talking about the pitfalls of averaging colors and how gamma and color space affects it.",
        id: "e0HM_vfSuDw",
        title: "How to average color",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/khsviAjdjHg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcaNNax-rGxlVsyjrAe41_jNAoFw",
        index: 1,
        description:
          "I just wanted to check out if the new paintings are actually darker like everyone is saying.",
        id: "khsviAjdjHg",
        title: "Are the new 1.21 paintings really that dark?",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/6nulqmkLKqI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCY-iVXyn9jnEYFTvH2lPFcXAuADg",
        index: 2,
        description:
          "Discussion on how geology affects people and what geologists do.",
        id: "6nulqmkLKqI",
        title: "Why care about Geology",
      },
    ];
    return latestVideos;
  } catch (error) {
    console.error("Error fetching latest videos:", error);
    return [];
  }
}
