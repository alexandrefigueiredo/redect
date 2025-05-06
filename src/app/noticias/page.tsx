import { PrismaClient } from "@prisma/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { SearchBar } from "./components/SearchBar";
import { CategoryFilter } from "./components/CategoryFilter";
import { Pagination } from "./components/Pagination";
import { ShareButtons } from "./components/ShareButtons";

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

const ITEMS_PER_PAGE = 9;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search as string | undefined;
  const category = searchParams.category as string | undefined;

  // Build the where clause based on filters
  const where = {
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(category && { category }),
  };

  // Get total count for pagination
  const totalItems = await prisma.news.count({ where });
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const news = await prisma.news.findMany({
    where,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  });

  const categories = await prisma.news.findMany({
    select: { category: true },
    distinct: ["category"],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Notícias
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
                 Notícias inéditas e atualizadas sobre tecnologia, negócios e inovação
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <SearchBar />
              <CategoryFilter categories={categories.map((c: { category: string }) => c.category)} />
            </div>

            {/* News Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item: NewsWithAuthor) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  {item.imageUrl && (
                    <div className="relative h-48">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.publishedAt).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <Link href={`/noticias/${item.id}`}>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">
                      {item.content.length > 150
                        ? `${item.content.substring(0, 150)}...`
                        : item.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Por {item.author.name}
                      </span>
                      <ShareButtons
                        url={`/noticias/${item.id}`}
                        title={item.title}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  baseUrl="/noticias"
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 