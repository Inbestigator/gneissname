import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="mx-auto h-12 md:h-24 max-w-7xl px-6 grow mt-8 md:text-start text-center">
      <p className="text-sm">{siteConfig.footer}</p>
    </footer>
  )
}
