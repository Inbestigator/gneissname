import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image"

export default function Component() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 hidden lg:flex" href="/">
          <Image
            src="/favicon.ico"
            width={40}
            height={40}
            className="overflow-hidden rounded-lg h-50"
            alt={"Home icon"}
          />
          <span className="sr-only">Youtuber&aposs Website</span>
        </Link>
        <div className="md:ml-auto md:m-0 m-auto flex gap-2 justify-center lg:justify-end">
          <Button variant="outline" asChild>
            <Link href="https://youtube.com/@gneissname">Youtube</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="https://discord.gg/JYjNjbVNyc">Discord</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="mailto:gneiss.name@gmail.com">Contact</Link>
          </Button>
        </div>
      </header>
    </div>
  );
}
