import { OAuthUser } from "@/model/user";
import { client } from "./sanity";

export async function addNewUser({ id, name, email, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: "user",
    name: name,
    email: email,
    image: image,
    bookmarks: [],
  });
}

export async function getUserById(userId: string) {
  return client.fetch(
    `*[_type == 'user' && _id == "${userId}"][0] {
      ...,
      "id": _id,
      "name": name,
      "email": email,
      "image": image,
      "bookmarks":bookmarks[]->_id
    }
    `
  );
}

export async function getAllUsers() {
  return client.fetch(
    `*[_type == 'user']{
      ...,
      "id": _id,
      "name": name,
      "email": email,
      "image": image,
      "bookmarks":bookmarks[]->_id
    }
    `
  );
}

export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append("bookmarks", [
      {
        _ref: postId,
        _type: "reference",
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}