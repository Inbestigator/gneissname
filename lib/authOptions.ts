import { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

import { createDocument, documentExists } from "../firebaseUtils"

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
        if (!(await documentExists(`users/${user.id}`))) {
          const userData = new Map([["credit", 0]])
          await createDocument(userData, `users/${user.id}`)
        }
      }
      return token
    },
  },
}
