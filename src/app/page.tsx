import { getServerSession } from "next-auth";
import PostsLists from "./components/PostsLists";

export default async function Home() {
  const session = await getServerSession();
  const user = session?.user;

  return <section>{user ? <PostsLists /> : <h1 className="flex justify-center items-center font-bold sm:text-2xl md:text-6xl text-white h-[10rem] mx-auto bg-gray-400 mt-[20%]">로그인이 필요해요~</h1>}</section>;
}
