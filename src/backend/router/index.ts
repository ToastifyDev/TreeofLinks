import * as trpc from "@trpc/server";
import { date, z } from "zod";
import { prisma } from "@/backend/utils/prisma";
import { User } from "@prisma/client";

type DataType = {
  slug?: string;
  display_name?: string;
  bio?: string;

  location?: string;
  birthdate?: string;
  occupation?: string;

  gender?: string;
  pronouns?: string;
};

export const appRouter = trpc
  .router()
  .query("user", {
    input: z.string().optional(),
    async resolve({ input }) {
      if (!input) return;
      const user = await prisma?.user.findFirst({
        where: {
          id: input,
        },
      });
      return user;
    },
  })
  .mutation("user", {
    input: z.object({
      id: z.string(),
      slug: z.string().nullish(),
      display_name: z.string().nullish(),
      bio: z.string().nullish(),

      location: z.string().nullish(),
      birthdate: z.string().nullish(),
      occupation: z.string().nullish(),

      gender: z.string().nullish(),
      pronouns: z.string().nullish(),
    }),
    async resolve({ input }) {
      let data: DataType = {};
      if (input.slug) data.slug = input.slug;
      else if (input.slug === null) data.slug = "";

      if (input.display_name) data.display_name = input.display_name;
      else if (input.display_name === null) data.display_name = "";

      if (input.bio) data.bio = input.bio;
      else if (input.bio === null) data.bio = "";

      if (input.location) data.location = input.location;
      else if (input.location === null) data.location = "";

      if (input.birthdate) data.birthdate = input.birthdate;
      else if (input.birthdate === null) data.birthdate = "";

      if (input.occupation) data.occupation = input.occupation;
      else if (input.occupation === null) data.occupation = "";

      if (input.gender) data.gender = input.gender;
      else if (input.gender === null) data.gender = "";

      if (input.pronouns) data.pronouns = input.pronouns;
      else if (input.pronouns === null) data.pronouns = "";

      const user = await prisma?.user.update({
        where: {
          id: input.id,
        },
        data,
      });

      return user;
    },
  })
  .query("checkSlug", {
    input: z.object({
      id: z.string().optional(),
      slug: z.string(),
    }),
    async resolve({ input }) {
      const count = await prisma.user.count({
        where: {
          slug: input.slug,
          id: {
            not: input.id,
          },
        },
      });
      return count > 0;
    },
  });

export type AppRouter = typeof appRouter;
