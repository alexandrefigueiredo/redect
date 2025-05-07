import { Header } from "@/components/Header";
import { Banner } from "@/components/Banner";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Banner />
        
        {/* Missão e Valores */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Nossa Missão
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
              Contribuir para a melhoria contínua das produções científicas e das relações entre a academia e os Povos Tradicionais, internacionalizando o debate e fortalecendo as atividades de ensino, pesquisa e extensão.
            </p>

            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Valores Centrais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vida e Meio Ambiente</h3>
                <p className="text-gray-600">
                  Compromisso com a preservação e sustentabilidade ambiental.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Bem-viver dos Povos Tradicionais</h3>
                <p className="text-gray-600">
                  Respeito e valorização dos modos de vida tradicionais.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ética em Pesquisa</h3>
                <p className="text-gray-600">
                  Compromisso com a integridade e responsabilidade na pesquisa.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Direitos Humanos</h3>
                <p className="text-gray-600">
                  Defesa e promoção dos direitos fundamentais.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Valores Operacionais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cooperação</h3>
                <p className="text-gray-600">
                  Promoção da cooperação para o ensino, pesquisa e extensão universitária.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Etnodesenvolvimento</h3>
                <p className="text-gray-600">
                  Fomento ao etnodesenvolvimento e desenvolvimento sustentável.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Respeito</h3>
                <p className="text-gray-600">
                  Respeito à opinião e à decisão dos Povos Tradicionais quanto aos trabalhos acadêmico-científicos.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparência</h3>
                <p className="text-gray-600">
                  Compromisso com a transparência, legalidade e legitimidade dos processos de gestão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Seções Principais */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Navegue pelo Site
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <a href="/sobre" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quem Somos</h3>
                <p className="text-gray-600">
                  Conheça a história, missão e valores da RedeCT.
                </p>
              </a>
              <a href="/portfolio" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Portfólio</h3>
                <p className="text-gray-600">
                  Explore nossos projetos e iniciativas.
                </p>
              </a>
              <a href="/noticias" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Notícias</h3>
                <p className="text-gray-600">
                  Fique por dentro das últimas novidades.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* Contato */}
        <section className="bg-indigo-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Entre em Contato</span>
              <span className="block text-indigo-200">
                contato@redect.org
              </span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/contato"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 