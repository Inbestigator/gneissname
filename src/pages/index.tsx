import React from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { getLatestVideos } from "../lib/fetchYT";
import { FiExternalLink } from "react-icons/fi";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useMediaQuery } from 'react-responsive';

export async function getServerSideProps() {
  const latestVideos = await getLatestVideos();
  return {
    props: {
      latestVideos,
    },
  };
}

export default function Page({ latestVideos }: any) {
  const isMobile = useMediaQuery({ maxWidth: 480 });

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-between container mx-auto p-4 md:p-6 lg:p-8">
        <Card className="w-full m-4">
          <CardHeader>
            <CardTitle>About me</CardTitle>
            <CardDescription>I&apos;m a geologist and just enjoy making things.</CardDescription>
          </CardHeader>
        </Card>
        <div className="flex flex-col md:flex-row gap-4">
          {latestVideos.map((video: any, index: number) => (
            <Card key={video.id} className={"md:block " + ((index == 0) ? "block" : "hidden")}>
              <Image
                src={video.thumbnail}
                width={1920}
                height={1080}
                className="overflow-hidden rounded-t-lg h-50"
                style={{
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
                alt={"Thumbnail for " + video.title}
              />
              <CardHeader>
                <CardTitle>{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link
                    target="_blank"
                    href={"https://youtube.com/watch?v=" + video.id}
                  >
                    Watch on YouTube <FiExternalLink className="ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
