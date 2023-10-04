"use client";

import usePosts from "../hooks/posts";
import useUser from "../hooks/user";
import BookmarkedPost from "./BookmarkedPost";
import PostList from "./PostList";
import MultiCarousel from "./carousel/MultiCarousel";
import LoadingSpinner from "./spinner/LoadingSpinner";

export default function PostsLists() {
  const { posts, isLoading, error } = usePosts();
  const { user } = useUser();

  const bookmarkedPosts = posts
    ? posts?.filter((post) => user?.bookmarks.includes(post.postId))
    : [];

  return (
    <section className="flex flex-col sm:justify-center sm:items-center lg:flex-row lg:items-start mx-auto">
      {isLoading && (
        <div className="absolute inset-0 text-center pt-[30%]">
          <LoadingSpinner />
        </div>
      )}

      <ul className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mx-4 my-10 lg:mr-20">
        {posts &&
          posts.map((post, index) => (
            <li key={post.postId}>
              <PostList post={post} />
            </li>
          ))}
      </ul>

      {(posts && posts.length > 0) && (
        <aside className="lg:w-1/5 sm:w-1/2 flex flex-col h-[10rem] rounded-lg m-auto my-10 mx-1 z-20">
          <p className="sm:text-2xl text-center font-bold mb-4">
            북마크 리스트
          </p>
          {bookmarkedPosts.length > 0 ? (
            <MultiCarousel>
              {bookmarkedPosts.map((post) => (
                <BookmarkedPost key={post.postId} post={post} />
              ))}
            </MultiCarousel>
          ) : (
            <p className="px-4 text-center font-bold text-gray-400">북마크를 등록해주세요~</p>
          )}
        </aside>
      )}
    </section>
  );
}
