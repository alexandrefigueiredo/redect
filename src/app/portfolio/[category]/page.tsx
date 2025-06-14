import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/EmptyState";

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category);

  try {
    const items = await prisma.portfolio.findMany({
      where: {
        category: category,
      },
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
    });

    if (items.length === 0) {
      return (
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <div className="bg-[#BE382A]">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                  <Link
                    href="/portfolio"
                    className="text-white/90 hover:text-white mb-4 inline-block"
                  >
                    ← Voltar para Categorias
                  </Link>
                  <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    {category}
                  </h1>
                </div>
              </div>
            </div>

            <div className="bg-white">
              <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <EmptyState
                  title="Nenhum item disponível"
                  description="Ainda não há itens cadastrados nesta categoria."
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
              </div>
            </div>
          </main>
          <Footer />
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-[#BE382A]">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <Link
                  href="/portfolio"
                  className="text-white/90 hover:text-white mb-4 inline-block"
                >
                  ← Voltar para Categorias
                </Link>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                  {category}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
                  Explore os itens desta categoria
                </p>
              </div>
            </div>
          </div>

          {/* Lista de Itens */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/portfolio/${encodeURIComponent(category)}/${item.id}`}
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
                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#BE382A] transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-gray-600 line-clamp-3">
                          {item.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.technologies.split(',').map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#BE382A]/10 text-[#BE382A] rounded-full text-xs"
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                          <span>Por {item.author.name}</span>
                          <span>
                            {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching items:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Erro ao carregar itens
                </h1>
                <p className="text-gray-600">
                  Desculpe, ocorreu um erro ao carregar os itens. Por favor, tente novamente mais tarde.
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