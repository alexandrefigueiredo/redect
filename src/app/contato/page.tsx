import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ContatoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-[#BE382A]">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                Contato
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
                Entre em contato com a RedeCT para mais informações.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Informações de Contato
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-2 text-gray-600">
                      <a href="mailto:contato@redect.org" className="text-[#BE382A] hover:text-[#A32E22]">
                        contato@redect.org
                      </a>
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Redes Sociais</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-gray-600">
                        Siga-nos nas redes sociais para ficar por dentro das novidades:
                      </p>
                      <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-[#BE382A]">
                          Facebook
                        </a>
                        <a href="#" className="text-gray-600 hover:text-[#BE382A]">
                          Instagram
                        </a>
                        <a href="#" className="text-gray-600 hover:text-[#BE382A]">
                          Twitter
                        </a>
                      </div>
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
} 