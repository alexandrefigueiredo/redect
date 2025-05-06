import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PortfolioForm from "../components/PortfolioForm";
import { authOptions } from "@/lib/auth";

export default async function NewPortfolioPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Novo Projeto</h1>
        <p className="mt-1 text-sm text-gray-400">
          Adicione um novo projeto ao portfólio
        </p>
      </div>

      <PortfolioForm submitLabel="Adicionar" />
    </div>
  );
} 