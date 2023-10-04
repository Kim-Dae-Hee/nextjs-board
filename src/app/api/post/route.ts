import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { removePost } from "@/service/posts";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { postId } = await req.json();

  return removePost(postId) //
  .then((res) => NextResponse.json(res))
  .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  
}
