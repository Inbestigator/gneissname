import { cache } from "@/db";

export const GET = () => cache.listVideos().then(Response.json);
