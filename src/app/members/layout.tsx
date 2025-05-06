import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { LogoutButton } from "./components/LogoutButton";

export default async function MembersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link
                href="/members/news"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Notícias
              </Link>
              <Link
                href="/members/portfolio"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Portfólio
              </Link>
              <Link
                href="/members/files"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Arquivos
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Voltar ao Site
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 