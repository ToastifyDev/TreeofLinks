import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "@/backend/utils/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string")
    return res.status(400).json({ error: "A slug wasn't specified." });

  const data = await prisma.user.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data)
    return res.status(404).json({ error: `No user with slug ${slug} found.` });

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.status(200).json(data);
};
