import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";

const ITEMS_PER_PAGE = 9;

interface NewsPageProps {
  searchParams: {
    search?: string;
    category?: string;
    page?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const search = searchParams.search || '';
  const category = searchParams.category;
  const page = Number(searchParams.page) || 1;

  try {
    // Build the where clause based on filters
    const where = {
      ...(search && {
        OR: [
          { title: { contains: search } },
          { content: { contains: search } },
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
        publishedAt: 'desc',
      },
      skip: (page - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    });

    const categories = await prisma.news.findMany({
      select: { category: true },
      distinct: ['category'],
    });

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-[#BE382A]">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Notícias
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
                  Fique por dentro das últimas novidades
                </p>
              </div>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <form className="w-full md:w-96">
                  <div className="relative">
                    <input
                      type="text"
                      name="search"
                      defaultValue={search}
                      placeholder="Buscar notícias..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BE382A] focus:border-[#BE382A]"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>

                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  <Link
                    href={`/noticias${search ? `?search=${search}` : ''}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                      !category
                        ? 'bg-[#BE382A] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Todas
                  </Link>
                  {categories.map(({ category: cat }) => (
                    <Link
                      key={cat}
                      href={`/noticias?category=${encodeURIComponent(cat)}${
                        search ? `&search=${search}` : ''
                      }`}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                        category === cat
                          ? 'bg-[#BE382A] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Notícias */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              {news.length === 0 ? (
                <EmptyState
                  title={search || category ? "Nenhuma notícia encontrada" : "Nenhuma notícia disponível"}
                  description={
                    search || category
                      ? "Não encontramos notícias que correspondam aos filtros selecionados."
                      : "Ainda não há notícias publicadas."
                  }
                  icon={
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  }
                />
              ) : (
                <>
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {news.map((item) => (
                      <Link
                        key={item.id}
                        href={`/noticias/${item.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                          {item.imageUrl && (
                            <div className="aspect-video overflow-hidden">
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-block bg-[#BE382A]/10 text-[#BE382A] text-sm font-medium px-3 py-1 rounded-full">
                                {item.category}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#BE382A] transition-colors duration-300">
                              {item.title}
                            </h3>
                            <p className="mt-2 text-gray-600 line-clamp-3">
                              {item.content}
                            </p>
                            <div className="mt-4 text-sm text-gray-500">
                              Por {item.author?.name}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Paginação */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <nav className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <Link
                            key={pageNum}
                            href={`/noticias?page=${pageNum}${
                              search ? `&search=${search}` : ''
                            }${category ? `&category=${category}` : ''}`}
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                              pageNum === page
                                ? 'bg-[#BE382A] text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {pageNum}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching news:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Erro ao carregar notícias
                </h1>
                <p className="text-gray-600">
                  Desculpe, ocorreu um erro ao carregar as notícias. Por favor, tente novamente mais tarde.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
} 