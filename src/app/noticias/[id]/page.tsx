import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShareButtons } from "../components/ShareButtons";

const prisma = new PrismaClient();

type NewsWithAuthor = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  category: string;
  publishedAt: Date;
  author: {
    name: string | null;
  };
};

export default async function NewsArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const news = await prisma.news.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!news) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-white text-black">
        <article className="max-w-4xl mx-auto px-4 py-12">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {news.category}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(news.publishedAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {news.title}
            </h1>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">
                Por {news.author.name}
              </p>
              <ShareButtons
                url={`/noticias/${news.id}`}
                title={news.title}
              />
            </div>
          </header>

          {news.imageUrl && (
            <div className="mb-8">
              <img
                src={news.imageUrl}
                alt={news.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {news.content.split("\n").map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
} 