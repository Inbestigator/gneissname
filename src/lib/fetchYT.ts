import { Video } from "@/components/latestVideos";

export async function getLatestVideos(): Promise<Video[]> {
  try {
    const latestVideos = [
      {
        thumbnail:
          "https://i.ytimg.com/vi/6nulqmkLKqI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCY-iVXyn9jnEYFTvH2lPFcXAuADg",
        index: 1,
        description:
          "Discussion on how geology affects people and what geologists do.",
        id: "6nulqmkLKqI",
        title: "Why care about Geology",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/EIlp8wyY97c/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA5tHsd-3VRm6M4O649M3JRMMjAPg",
        index: 2,
        description:
          "I went back to redo the missing color video from last year but this time using oklab and some math to figure them out.",
        id: "EIlp8wyY97c",
        title: "The Real Missing Colors of Minecraft (*1.20)",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/khsviAjdjHg/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcaNNax-rGxlVsyjrAe41_jNAoFw",
        index: 0,
        description: "I just wanted to check out if the new paintings are actually darker like everyone is saying.",
        id: "khsviAjdjHg",
        title: "Are the new 1.21 paintings really that dark?",
      },
    ];
    return latestVideos;
  } catch (error) {
    console.error("Error fetching latest videos:", error);
    return [];
  }
}
