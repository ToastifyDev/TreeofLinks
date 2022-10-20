import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const slug = req.nextUrl.pathname.split("/").pop();

  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  if (slugFetch.status === 404) return NextResponse.next();
  const data = await slugFetch.json();

  if (data?.id)
    return NextResponse.rewrite(new URL(`/user/${data?.id}`, req.url));
}

export const config = {
  matcher: "/:slug*",
};
