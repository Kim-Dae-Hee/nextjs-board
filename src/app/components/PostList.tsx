"user client";

import { Post } from "@/model/post";
import { useSession } from "next-auth/react";
import { useState } from "react";
import PostModalPortal from "./modal/PostModal";
import PostModal from "./PostModal";
import PostCard from "./PostCard";
import { OAuthUser } from "@/model/user";

type Props = {
  post: Post;
};

export default function PostList({ post }: Props) {
  const { data: session } = useSession();
  const [isModal, setModal] = useState(false);

  const user: OAuthUser = session?.user!;
  if (!user || !post) {
    return;
  }

  const toggleModal = () => {
   setModal(!isModal);
  };

  return (
    <article className="flex flex-col cursor-pointer border border-neutral-300 rounded-lg hover:scale-105 transition-all shadow-md hover:shadow-xl">
      <div onClick={toggleModal}>
        <PostCard key={post.postId} post={post} />
      </div>
      {isModal && (
        <PostModalPortal>
          <PostModal onClose={toggleModal}>
            <PostCard key={post.postId} post={post} modal />
          </PostModal>
        </PostModalPortal>
      )}
    </article>
  );
}
