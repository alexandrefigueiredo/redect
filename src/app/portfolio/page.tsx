import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Portfólio
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
                Conheça nossos projetos e cases de sucesso.
              </p>
            </div>
          </div>
        </div>

        {/* Filtros e Lista de Projetos */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filtros */}
          <div className="mb-8 flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Todos
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Desenvolvimento
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Design
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
              Consultoria
            </button>
          </div>

          {/* Lista de Projetos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Projeto 1 */}
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
                alt="Projeto 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2">Desenvolvimento</div>
                <h3 className="text-xl font-semibold mb-2">
                  Sistema de Gestão Empresarial
                </h3>
                <p className="text-gray-600 mb-4">
                  Desenvolvimento de um sistema completo para gestão de empresas,
                  incluindo módulos de RH, financeiro e vendas.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    Node.js
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    PostgreSQL
                  </span>
                </div>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Ver detalhes →
                </a>
              </div>
            </article>

            {/* Projeto 2 */}
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                alt="Projeto 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2">Design</div>
                <h3 className="text-xl font-semibold mb-2">
                  Redesign de E-commerce
                </h3>
                <p className="text-gray-600 mb-4">
                  Redesign completo de uma plataforma de e-commerce, focando na
                  experiência do usuário e conversão.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    UI/UX
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    Figma
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    Adobe XD
                  </span>
                </div>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Ver detalhes →
                </a>
              </div>
            </article>

            {/* Projeto 3 */}
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                alt="Projeto 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-indigo-600 mb-2">Consultoria</div>
                <h3 className="text-xl font-semibold mb-2">
                  Transformação Digital
                </h3>
                <p className="text-gray-600 mb-4">
                  Consultoria para transformação digital de uma empresa
                  tradicional, incluindo mudanças de processos e cultura.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    Estratégia
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    Processos
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    Cultura
                  </span>
                </div>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Ver detalhes →
                </a>
              </div>
            </article>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-indigo-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Tem um projeto em mente?
            </h2>
            <p className="text-gray-600 mb-6">
              Vamos trabalhar juntos para transformar sua ideia em realidade.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 