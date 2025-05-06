import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Sobre a Rede CT
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
                Conectando pessoas e ideias para transformar o futuro da tecnologia.
              </p>
            </div>
          </div>
        </div>

        {/* Missão e Visão */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
                <p className="text-lg text-gray-600">
                  Promover a integração e o desenvolvimento da comunidade de tecnologia,
                  fomentando a troca de conhecimentos e experiências entre profissionais
                  da área.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Visão</h2>
                <p className="text-lg text-gray-600">
                  Ser referência nacional em networking e desenvolvimento profissional
                  na área de tecnologia, conectando pessoas e empresas para criar
                  um ecossistema inovador e sustentável.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nossos Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Inovação</h3>
                <p className="text-gray-600">
                  Buscamos constantemente novas soluções e abordagens para os
                  desafios tecnológicos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Colaboração</h3>
                <p className="text-gray-600">
                  Acreditamos no poder da união e no compartilhamento de
                  conhecimentos.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Excelência</h3>
                <p className="text-gray-600">
                  Comprometimento com a qualidade e o desenvolvimento contínuo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Equipe */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nossa Equipe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-semibold mb-2">João Silva</h3>
                <p className="text-gray-600">Presidente</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-semibold mb-2">Maria Santos</h3>
                <p className="text-gray-600">Diretora de Tecnologia</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200"></div>
                <h3 className="text-xl font-semibold mb-2">Pedro Oliveira</h3>
                <p className="text-gray-600">Diretor de Comunicação</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 