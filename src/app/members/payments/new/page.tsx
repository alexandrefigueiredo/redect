import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PaymentForm from "../components/PaymentForm";

export default async function NewPaymentPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Novo Pagamento</h1>
        <p className="mt-1 text-sm text-gray-400">
          Adicione um novo pagamento ao sistema.
        </p>
      </div>

      <PaymentForm />
    </div>
  );
} 