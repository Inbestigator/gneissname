"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./modeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { theme, setTheme } = useTheme();
  async function swapThemes() {
    setTheme(theme == "light" ? "dark" : "light");
  }

  return (
    <NavigationMenu
      className="flex p-2 justify-center items-center md:justify-start min-w-full sticky top-0 border-b"
      style={{
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <NavigationMenuList>
        <Link href="/" className="ml-4 hidden md:block">
          <Image
            src="/favicon.ico"
            width={40}
            height={40}
            className="rounded-sm h-7 w-7"
            alt={"Home icon"}
            draggable={false}
          />
        </Link>
        <NavigationMenuItem>
          <Link href="https://youtube.com/@gneissname" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Youtube
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="https://discord.gg/JYjNjbVNyc" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Discord
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="mailto:gneiss.name@gmail.com" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            onClick={() => swapThemes()}
          >
            <ModeToggle />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
