import NextAuth, { DefaultSession, User, AdaptorUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      discriminator: string;
    } & DefaultSession["user"];
  }
}
