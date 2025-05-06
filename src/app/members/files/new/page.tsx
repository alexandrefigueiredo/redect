import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import FileForm from "../components/FileForm";

export default async function NewFilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Novo Arquivo</h1>
        <p className="mt-1 text-sm text-gray-400">
          Adicione um novo arquivo ao sistema.
        </p>
      </div>

      <FileForm />
    </div>
  );
} 