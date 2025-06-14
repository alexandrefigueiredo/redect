import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-[#BE382A]">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Quem Somos
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
                Uma rede independente que reúne pesquisadores e Povos Tradicionais para fortalecer a produção científica e o diálogo intercultural.
              </p>
            </div>
          </div>
        </div>

        {/* História */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Nossa História</h2>
            <div className="prose prose-lg max-w-none">
              <p>
                A RedeCT tem suas origens na SocialDHC, criada em 2002, e foi institucionalizada em 2021. 
                Ao longo de sua trajetória, a rede tem se dedicado a promover a integração entre a academia 
                e os Povos Tradicionais, contribuindo para o fortalecimento das relações interculturais e 
                para a produção de conhecimento científico de qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* Eixos Temáticos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Eixos Temáticos Permanentes (ETPs)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pesquisa</h3>
                <p className="text-gray-600">
                  Desenvolvimento de pesquisas colaborativas com Povos Tradicionais.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ensino</h3>
                <p className="text-gray-600">
                  Formação acadêmica e intercâmbio de conhecimentos tradicionais.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Extensão</h3>
                <p className="text-gray-600">
                  Projetos de extensão universitária em parceria com comunidades tradicionais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Categorias de Pesquisadores */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Categorias de Pesquisadores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pesquisador Sênior</h3>
                <p className="text-gray-600">
                  Pesquisadores com ampla experiência e produção acadêmica consolidada.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pesquisador</h3>
                <p className="text-gray-600">
                  Pesquisadores em atividade com produção acadêmica em desenvolvimento.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pesquisador Júnior</h3>
                <p className="text-gray-600">
                  Pesquisadores em formação, incluindo estudantes de graduação e pós-graduação.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Parceiros */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Parceiros e Financiadores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Instituições de Ensino</h3>
                <p className="text-gray-600">
                  Universidades e centros de pesquisa parceiros.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Organizações</h3>
                <p className="text-gray-600">
                  Organizações não-governamentais e instituições de fomento.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Comunidades</h3>
                <p className="text-gray-600">
                  Comunidades tradicionais e organizações indígenas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Controle Social */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Controle Social e Transparência
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                A RedeCT mantém um compromisso com a transparência e o controle social de suas atividades. 
                Todas as ações são desenvolvidas com base em princípios éticos e de responsabilidade social, 
                garantindo a participação efetiva dos Povos Tradicionais nas decisões que os afetam.
              </p>
            </div>
          </div>
        </section>

        {/* Instituto */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Instituto de Pesquisas Amazônicas e de Povos Tradicionais
            </h2>
            <div className="prose prose-lg max-w-none">
              <p>
                A RedeCT é mantida pelo Instituto de Pesquisas Amazônicas e de Povos Tradicionais, 
                uma OSCIP dedicada ao desenvolvimento de pesquisas e ações em parceria com Povos Tradicionais.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 