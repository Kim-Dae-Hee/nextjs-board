import { HomeUser } from "@/model/user";
import { useCallback } from "react";
import useSWR from "swr";

async function updateBookMark(
  userId: string,
  postId: string,
  bookmark: boolean
) {
  return fetch("/api/bookmarks", {
    method: "PUT",
    body: JSON.stringify({ userId, postId, bookmark }),
  }).then((res) => res.json());
}

export default function useUser() {
  const { data: user, isLoading, error, mutate } = useSWR<HomeUser>("/api/user");

  const setBookMark = useCallback(
    (userId: string, postId: string, bookmark: boolean) => {
      if (!user) return;
      const bookmarks = user.bookmarks ?? [];
      const addBookmarkedUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };

      mutate(updateBookMark(userId, postId, bookmark), {
        optimisticData: addBookmarkedUser, // 해당 데이터를 UI에 바로 적용 - 추후에 revalidate 데이터 적용
        populateCache: false, //updateBookmark 함수 반환 값을 캐시로 사용하지 않는다.
        rollbackOnError: true,
      })
    },
    [user, mutate]
  );

  return { user, isLoading, error, setBookMark };
}
