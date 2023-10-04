import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddNewPost from "../components/AddNewPost";

export const metadata: Metadata = {
  title: "Add New Post",
  description: "새로운 포스트를 등록",
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }

  return <AddNewPost />;
}
