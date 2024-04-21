import { readField } from "./firebaseUtils";

export async function getLatestVideos() {
  try {
    // const latestVideos = await readField("misc/youtube", "videos");
    const latestVideos = [
      {
        thumbnail:
          "https://i.ytimg.com/vi/6nulqmkLKqI/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCY-iVXyn9jnEYFTvH2lPFcXAuADg",
        index: 0,
        description:
          "Discussion on how geology affects people and what geologists do.",
        id: "6nulqmkLKqI",
        title: "Why care about Geology",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/EIlp8wyY97c/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA5tHsd-3VRm6M4O649M3JRMMjAPg",
        index: 1,
        description:
          "I went back to redo the missing color video from last year but this time using oklab and some math to figure them out.",
        id: "EIlp8wyY97c",
        title: " The Real Missing Colors of Minecraft (*1.20) ",
      },
      {
        thumbnail:
          "https://i.ytimg.com/vi/PHDznOL3qzs/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCHp--CW2PNCQEnB53U79dFcqkkZA",
        index: 2,
        description: "How to use one noteblock to run multiple commands.",
        id: "PHDznOL3qzs",
        title: " Noteblock command tutorial ",
      },
    ];
    return latestVideos;
  } catch (error) {
    console.error("Error fetching latest videos:", error);
    return [];
  }
}
