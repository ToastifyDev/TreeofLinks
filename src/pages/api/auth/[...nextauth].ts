import { prisma } from "@/backend/utils/prisma";
import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";

const scopes = ["identify"].join(" ");

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      authorization: { params: { scope: scopes } },
    }),
  ],
  secret:
    "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
  theme: {
    logo: "/logo.png",
  },
  callbacks: {
    async jwt({ token, account, user, profile }) {
      if (profile) {
        const p = profile as DiscordProfile;
        token.discriminator = p.discriminator;

        await prisma?.user.upsert({
          where: {
            id: p.id,
          },
          create: {
            id: p.id,
            name: p.username,
            discriminator: p.discriminator,
            image: p.image_url,
          },
          update: {
            id: p.id,
            name: p.username,
            discriminator: p.discriminator,
            image: p.image_url,
          },
        });
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub as string,
        discriminator: token.discriminator as string,
      };

      return session;
    },
  },
};
export default NextAuth(authOptions);
