import { AnimeService } from "@/components/services";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { getAnimeById } = AnimeService();

  const response = await getAnimeById(id);
  const data = response.data;

  return (
    <main className="container mx-auto space-y-8 px-4 py-12">
      <header className="flex items-center space-x-2 text-lg font-bold">
        <Link href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H6M12 5l-7 7 7 7" />
          </svg>
        </Link>
        <span>{data.title}</span>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Image
          src={data.images.jpg.large_image_url}
          alt={data.title}
          className="h-full w-full rounded-lg shadow-lg"
          width={700}
          height={700}
        />
        <p className="text-zinc-500">{data.synopsis}</p>
        <div className="flex justify-center space-x-4 md:flex-col md:justify-start">
          <span>Score: {data.score}</span>
          <span>Episodes: {data.episodes}</span>
          <span>Status: {data.status}</span>
        </div>
      </section>
    </main>
  );
}
