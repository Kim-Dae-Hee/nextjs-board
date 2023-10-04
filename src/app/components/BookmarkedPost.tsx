import { Post } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import PostModalPortal from "./modal/PostModal";
import PostModal from "./PostModal";
import PostCard from "./PostCard";

type Props = {
  post: Post;
};

export default function BookmarkedPost({ post }: Props) {
  const { image, username } = post;
  const [isModal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModal);
  };

  return (
    <section>
      <div className="relative aspect-square h-[6rem]">
        <Image
          onClick={toggleModal}
          className="rounded-full object-cover"
          src={image}
          alt={`${username}`}
          fill
        />
      </div>
      {isModal && (
        <PostModalPortal>
          <PostModal onClose={toggleModal}>
            <PostCard key={post.postId} post={post} modal />
          </PostModal>
        </PostModalPortal>
      )}
    </section>
  );
}
