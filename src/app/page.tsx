import { AnimeContentSection } from "@/components/containers";

export default async function Home() {
  return (
    <main className="container mx-auto space-y-8 px-4 py-12">
      <header className="text-center">
        <h1>AnimeX</h1>
      </header>
      <AnimeContentSection />
    </main>
  );
}
