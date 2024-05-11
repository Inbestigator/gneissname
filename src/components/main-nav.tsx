import Link from "next/link";
import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="hidden md:flex mr-6 items-center space-x-2">
        <Image
          src="/favicon.ico"
          width={40}
          height={40}
          className="rounded-sm h-7 w-7"
          alt={"Home icon"}
          draggable={false}
        />
        <span className="font-bold inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center text-sm gap-6">
        <Link
          href={siteConfig.links.youtube}
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80"
          )}
        >
          YouTube
        </Link>
        <Link
          href={siteConfig.links.discord}
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80"
          )}
        >
          Discord
        </Link>
        <Link
          href="mailto:gneiss.name@gmail.com"
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80"
          )}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
