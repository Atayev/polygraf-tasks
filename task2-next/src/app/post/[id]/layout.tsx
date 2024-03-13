"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const PostLayout = ({
  children,
  params: { id },
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) => {
  const router = useRouter();
  const handleNext = () => {
    if (parseInt(id) === 10) return;
    router.push(`/post/${parseInt(id) + 1}`);
  };
  const handlePrev = () => {
    if (parseInt(id) === 1) return;
    router.push(`/post/${parseInt(id) - 1}`);
  };
  return (
    <div className="max-w-[80%] mx-auto flex flex-col items-end">
      {children}
      <div className="w-full flex justify-between">
        <button
          disabled={parseInt(id) === 1}
          onClick={handlePrev}
          className="p-4 w-[200px] border-2 border-white rounded-lg hover:bg-white hover:text-black disabled:cursor-not-allowed"
        >
          prev
        </button>
        <button
          disabled={parseInt(id) === 10}
          onClick={handleNext}
          className="p-4 w-[200px] border-2 border-white rounded-lg hover:bg-white hover:text-black disabled:cursor-not-allowed"
        >
          next
        </button>
      </div>
      <Link
        href={"/"}
        className="p-2 border-2 my-2 border-white rounded-lg w-[200px] hover:bg-white hover:text-black text-center "
      >
        Go to posts
      </Link>
    </div>
  );
};

export default PostLayout;
