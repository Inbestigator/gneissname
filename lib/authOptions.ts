import { prisma } from "@/db"
import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? "",
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify",
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async redirect() {
      return "/dashboard"
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
        const prismaUser = await prisma.user.findFirst({
          where: { id: user.id },
        })
        if (!prismaUser) {
          await prisma.user.create({ data: { id: user.id, credit: 0 } })
        }
      }
      return token
    },
  },
}
