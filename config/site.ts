export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Gneissname",
  description: "I'm a geologist and YouTuber who likes to make things.",
  footer: "©2024 Gneissname. Built by Inbestigator.",
  mainNav: [
    {
      title: "YouTube",
      href: "https://youtube.com/@gneissname",
      external: true,
    },
    {
      title: "Discord",
      href: "https://discord.gg/JYjNjbVNyc",
      external: true,
    },
    {
      title: "Contact",
      href: "mailto:gneiss.name@gmail.com",
      external: true,
    },
  ],
  links: {
    youtube: "https://youtube.com/@gneissname",
    discord: "https://discord.gg/JYjNjbVNyc",
  },
}
