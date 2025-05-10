import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createClient } from "redis";

export const prisma = new PrismaClient().$extends(withAccelerate());
export const redis = await createClient({
  url: process.env.REDIS_URL,
}).connect();
