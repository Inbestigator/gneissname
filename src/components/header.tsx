import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ModeToggle } from "./modeToggle"
import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"

export default function Header() {
  const { setTheme } = useTheme()
  return (
    <Menubar>
      {/* <MenubarMenu>
        <Link className="mr-6 hidden lg:flex" href="/">
          <Image
            src="/favicon.ico"
            width={40}
            height={40}
            className="overflow-hidden rounded-lg h-50"
            alt={"Home icon"}
          />
        </Link>
      </MenubarMenu> */}
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
        <MenubarTrigger className="cursor-pointer"><ModeToggle /></MenubarTrigger>
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
    </Menubar>
  )
}
