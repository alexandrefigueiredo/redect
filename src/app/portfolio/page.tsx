import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { EmptyState } from "@/components/EmptyState";

export default async function PortfolioPage() {
  try {
    // Get unique categories from portfolios
    const categories = await prisma.portfolio.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc',
      },
    });

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-[#BE382A]">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                  Portfólio
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
                  Explore nossos recursos e materiais organizados por categoria
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Categorias */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              {categories.length === 0 ? (
                <EmptyState
                  title="Nenhuma categoria disponível"
                  description="Ainda não há categorias cadastradas no portfólio."
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  }
                />
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {categories.map(({ category }) => (
                    <Link
                      key={category}
                      href={`/portfolio/${encodeURIComponent(category)}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="p-6">
                          <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-[#BE382A] transition-colors duration-300">
                            {category}
                          </h3>
                          <div className="mt-4 flex items-center text-[#BE382A] group-hover:text-[#BE382A]">
                            <span className="text-sm font-medium">Explorar categoria</span>
                            <svg
                              className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Erro ao carregar categorias
                </h1>
                <p className="text-gray-600">
                  Desculpe, ocorreu um erro ao carregar as categorias. Por favor, tente novamente mais tarde.
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