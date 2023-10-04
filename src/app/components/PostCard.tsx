import Image from "next/image";
import { parseDate } from "@/util/timeago";
import ProfileImage from "../context/ProfileImage";
import { Post } from "@/model/post";
import BookMarkIcon from "./icons/BookMarkIcon";
import ToggleButton from "./ToggleButton";
import BookMarkFillIcon from "./icons/BookMarkFillIcon";
import useUser from "../hooks/user";
import DeletePostIcon from "./icons/DeletePostIcon";
import useUsers from "../hooks/users";
import usePosts from "../hooks/posts";

type Props = {
  post: Post;
  modal?: boolean;
};

export default function PostCard({ post, modal = false }: Props) {
  const {
    postId,
    title,
    username,
    image,
    content,
    createdAt,
    userId: postRegistrar,
    userImage
  } = post;

  const { deletePost } = usePosts();
  const { removeBookmark } = useUsers();
  const { user, setBookMark } = useUser();
  if (!user) return;
  const { bookmarks, id: userId } = user;

  const bookmarked = bookmarks?.includes(postId);
  const handleBookMark = (bookmark: boolean) => {
    user && setBookMark(userId, postId, bookmark);
  };

  const handlePost = () => {
    // 1. users에 참조된 postId 제거
    post && removeBookmark(postId);
    setTimeout(() => {
      // 2. postId의 post 제거
      post && deletePost(postId);  
    }, 3000);
  }

  return (
    <section>
      <div className="flex w-full justify-between items-center px-4 py-2">
        <h1 className="font-bold text-2xl py-2 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h1>
        <div className="flex gap-4 items-center justify-center">
          <ProfileImage image={userImage ?? ""} />
          {userId === postRegistrar && modal && <DeletePostIcon deletePost={handlePost} modal />}
        </div>
      </div>
      <div
        className={`relative w-full border-b-1 aspect-square ${
          !modal ? "h-[20rem]" : "h-[30rem]"
        }`}
      >
        <Image className="object-cover" src={image} alt={`${username}`} fill />
      </div>
      <div className="flex justify-between items-center border-b-4 px-2 py-2">
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookMark}
          onIcon={<BookMarkFillIcon modal />}
          offIcon={<BookMarkIcon modal />}
        />
        <p className="text-md text-sky-600">{parseDate(createdAt)}</p>
      </div>
      <div className="max-h-[10rem] px-4 py-4 text-lg overflow-y-auto">
        <p>{!modal ? content.slice(0, 5) + "....." : content}</p>
      </div>
    </section>
  );
}
