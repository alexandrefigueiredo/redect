import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type ItemPageProps = {
  params: {
    category: string;
    id: string;
  };
};

export default async function ItemPage({ params }: ItemPageProps) {
  const category = decodeURIComponent(params.category);

  try {
    const item = await prisma.portfolio.findUnique({
      where: {
        id: params.id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!item || item.category !== category) {
      notFound();
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-[#BE382A]">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
              <div className="text-center">
                <Link
                  href={`/portfolio/${encodeURIComponent(category)}`}
                  className="text-white/90 hover:text-white mb-4 inline-block"
                >
                  ← Voltar para {category}
                </Link>
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                  {item.title}
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
                  {item.description}
                </p>
              </div>
            </div>
          </div>

          {/* Detalhes do Item */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mx-auto">
                {item.imageUrl && (
                  <div className="mb-8 aspect-video overflow-hidden rounded-lg">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-lg max-w-none">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.split(',').map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#BE382A]/10 text-[#BE382A] rounded-full text-sm"
                      >
                        {tech.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Por {item.author.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Publicado em {new Date(item.publishedAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching item:', error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <div className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  Erro ao carregar item
                </h1>
                <p className="text-gray-600">
                  Desculpe, ocorreu um erro ao carregar o item. Por favor, tente novamente mais tarde.
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