import { NextResponse } from "next/server";
import { cache } from "@/db";

export const GET = () => cache.getTopUsers().then(NextResponse.json);
