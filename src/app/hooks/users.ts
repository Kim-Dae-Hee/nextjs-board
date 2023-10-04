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

export default function useUsers() {
  const {
    data: users,
    isLoading,
    error,
    mutate,
  } = useSWR<HomeUser[]>("/api/users");

  const removeBookmark = useCallback((postId: string) => {
    users?.map((user) => {
      if (user.bookmarks.includes(postId)) {
        const bookmarks = user.bookmarks ?? [];
        const addBookmarkedUser = {
          ...user,
          bookmarks: bookmarks.filter((b) => b !== postId),
        };

        const modifiedUsers = users.map((u) =>
          u.id === user.id ? addBookmarkedUser : u
        );

        mutate(updateBookMark(user.id, postId, false), {
          optimisticData: modifiedUsers, // 해당 데이터를 UI에 바로 적용 - 추후에 revalidate 데이터 적용
          populateCache: false, //updateBookMark 함수 반환 값을 캐시로 사용하지 않는다.
          rollbackOnError: true,
        })
      }
    });
  }, [users, mutate]);

  return { users, isLoading, error, removeBookmark };
}
