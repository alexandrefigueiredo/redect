import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function MembersPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Área de Membros</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gerencie o conteúdo do site
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Notícias */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Gerenciar Notícias
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Crie e gerencie as notícias do site.</p>
            </div>
            <div className="mt-5">
              <Link
                href="/members/news"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gerenciar Notícias
              </Link>
            </div>
          </div>
        </div>

        {/* Portfólio */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Gerenciar Portfólio
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Adicione e gerencie projetos do portfólio.</p>
            </div>
            <div className="mt-5">
              <Link
                href="/members/portfolio"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gerenciar Portfólio
              </Link>
            </div>
          </div>
        </div>

        {/* Arquivos */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Gerenciar Arquivos
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Faça upload e gerencie arquivos.</p>
            </div>
            <div className="mt-5">
              <Link
                href="/members/files"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gerenciar Arquivos
              </Link>
            </div>
          </div>
        </div>

        {/* Certificados */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Gerenciar Certificados
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Adicione e gerencie seus certificados.</p>
            </div>
            <div className="mt-5">
              <Link
                href="/members/certificates"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gerenciar Certificados
              </Link>
            </div>
          </div>
        </div>

        {/* Pagamentos */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">
              Gerenciar Pagamentos
            </h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Acompanhe seu histórico de pagamentos.</p>
            </div>
            <div className="mt-5">
              <Link
                href="/members/payments"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Gerenciar Pagamentos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 