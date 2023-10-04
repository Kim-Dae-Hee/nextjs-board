import { Post } from "@/model/post";
import { assetsURL, client, urlFor } from "./sanity";

export async function createPost(
  userId: string,
  title: string,
  content: string,
  file: Blob
) {
  return fetch(assetsURL, {
    method: "POST",
    headers: {
      "content-types": file.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`,
    },
    body: file,
  })
    .then((res) => res.json())
    .then((result) => {
      return client.create(
        {
          _type: "post",
          author: { _ref: userId },
          title: title,
          image: { asset: { _ref: result.document._id } },
          content: content,
        },
        { autoGenerateArrayKeys: true }
      );
    });
}

export async function getAllPosts() {
  return client
    .fetch(
      `*[_type == "post"]
      | order(_createdAt desc){
        ...,
        "userId": author->_id,
        "username": author->name,
        "userImage": author->image,
        "postId": _id,
        "createdAt" : _createdAt
      }
    `
    )
    .then(mapPosts);
}

export async function removePost(postId: string) {
  return client
    .delete({ query: `*[_type == 'post' && _id == "${postId}"]` }) //
    .catch((error) => {
      console.log(error);
    });
}

export async function mapPosts(posts: Post[]) {
  return posts.map((post: Post) => ({
    ...post,
    image: post.image == null ? "" : urlFor(post.image),
  }));
}
