import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="container mx-auto mt-8 flex h-12 gap-4 md:h-24">
      <Link target="_blank" href="https://youtube.com/@gneissname" className="link-hover">
        YouTube
      </Link>
      <Link target="_blank" href="https://discord.com/servers/gneiss-server-750062409364013159" className="link-hover">
        Discord
      </Link>
    </footer>
  );
}
