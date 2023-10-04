"use server";

import { revalidateTag } from "next/cache";

export default async function revalidateUsers() {
  return revalidateTag('SSR 페이지에서 사용하는 SWR 캐시 갱신값 넣기');
}

