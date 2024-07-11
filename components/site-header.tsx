import Image from "next/image"
import Link from "next/link"

export function SiteHeader() {
  return (
    <div className="border-b border-neutral">
      <div className="navbar max-w-7xl mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image
              src="/cdn/icon.png"
              alt="Gneiss icon"
              width={32}
              height={32}
              className="size-6 rounded-sm"
            />
            Gneissname
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://youtube.com/@gneissname"
              >
                YouTube
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noreferrer"
                href="https://discord.gg/JYjNjbVNyc"
              >
                Discord
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noreferrer"
                href="mailto:gneiss.name@gmail.com"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
