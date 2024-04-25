import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./modeToggle";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <Menubar className="flex justify-between items-center w-full px-4 py-2">
      <Link className="hidden md:block" href="/">
        <Image
          src="/favicon.ico"
          width={40}
          height={40}
          className="rounded-sm h-7 w-7"
          alt={"Home icon"}
        />
      </Link>
      <div className="flex items-center">
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="https://youtube.com/@gneissname">Youtube</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="https://discord.gg/JYjNjbVNyc">Discord</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <Link href="mailto:gneiss.name@gmail.com">Contact</Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <ModeToggle />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => setTheme("light")}>
              Light
            </MenubarItem>
            <MenubarItem onClick={() => setTheme("dark")}>
              Dark
            </MenubarItem>
            <MenubarItem onClick={() => setTheme("system")}>
              System
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </div>
    </Menubar>
  );
}
