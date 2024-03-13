import ky from "ky";
import React from "react";

const Post = async ({ params: { id } }: { params: { id: string } }) => {
  const post: Post = await ky
    .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    .json();

  const { id: postId, title, body } = post;
  return (
    <div className="h-80 flex flex-col justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center border-2 border-white rounded-lg p-4 max-w-[800px]">
        <p className="text-2xl font-bold">Post : {postId}</p>
        <p className="text-xl font-semibold">Title : {title}</p>
        <p className="text-center">Body : {body}</p>
      </div>
    </div>
  );
};

export default Post;
