"use client";

import useSWR from "swr";
import { Post } from "@/model/post";
import { useCallback } from "react";

async function removePost(postId: string) {
  return fetch("/api/post", {
    method: "POST",
    body: JSON.stringify({ postId }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<Post[]>("/api/posts");

  const deletePost = useCallback(
    (postId: string) => {
      const removedPosts = posts?.filter((post) => post.postId !== postId);
      mutate(removePost(postId), {
        optimisticData: removedPosts, // 해당 데이터를 UI에 바로 적용 - 추후에 revalidate 데이터 적용
        populateCache: false, //removePost 함수 반환 값을 캐시로 사용하지 않는다.
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, deletePost };
}
