import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LatestVideos from "@/components/latestVideos";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between container mx-auto p-4 md:p-6 lg:p-8">
      <CardTitle className="m-4 flex md:hidden text-3xl">Gneissname</CardTitle>
      <Card className="w-full m-4">
        <CardHeader>
          <CardTitle>About me</CardTitle>
          <CardDescription>
            I&apos;m a geologist and YouTuber who likes to make things. I try to
            explain geological concepts and other topics of interest to me in an
            understandable and fun way through the lens of Minecraft. Join my
            loyal &quot;gnerds&quot; and let&apos;s have some fun!
          </CardDescription>
        </CardHeader>
      </Card>
      <LatestVideos />
    </main>
  );
}
