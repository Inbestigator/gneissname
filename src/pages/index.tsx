import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LatestVideos from "@/components/latestVideos";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between container mx-auto p-4 md:p-6 lg:p-8">
        <Card className="w-full m-4">
          <CardHeader>
            <CardTitle>About me</CardTitle>
            <CardDescription>
              I&apos;m a geologist and just enjoy making things.
            </CardDescription>
          </CardHeader>
        </Card>
        <LatestVideos />
      </main>
      <Footer />
    </>
  );
}
