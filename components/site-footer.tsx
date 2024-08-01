import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-8 h-12 max-w-7xl grow px-6 text-center md:h-24 md:text-start">
      <p className="text-sm">{siteConfig.footer}</p>
    </footer>
  )
}
