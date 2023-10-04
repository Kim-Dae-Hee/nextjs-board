import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { createPost, getAllPosts } from "@/service/posts";

export async function GET(_: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  return getAllPosts().then((data) => NextResponse.json(data));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const form = await req.formData();
  const title = form.get("title")?.toString();
  const content = form.get("content")?.toString();
  const file = form.get("file") as Blob;

  if (!title || !content || !file) {
    return new Response("Bad Request", { status: 400 });
  }

  return createPost(user.id, title, content, file).then((data) =>
    NextResponse.json(data)
  );
}
