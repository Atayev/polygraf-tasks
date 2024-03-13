import ky from "ky";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const data: Post[] = await ky
    .get("https://jsonplaceholder.typicode.com/posts?_limit=10")
    .json();

  return (
    <main className="flex min-h-screen flex-col gap-4 items-center justify-between p-24">
      <p className="text-2xl font-bold">Posts</p>

      {data?.map((item) => (
        <Link
          href={`/post/${item.id}`}
          key={item.id}
          className="max-w-[800px] border-2 border-white rounded-lg p-6"
        >
          <p className="text-xl font-bold">{item.title}</p>
          <p>{item.body}</p>
        </Link>
      ))}
    </main>
  );
}
