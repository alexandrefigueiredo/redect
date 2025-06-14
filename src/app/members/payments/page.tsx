import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PaymentListItem from "./components/PaymentListItem";

export default async function PaymentsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const payments = await prisma.payment.findMany({
    orderBy: {
      date: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Histórico de Pagamentos</h1>
          <p className="mt-1 text-sm text-gray-400">
            Gerencie seu histórico de pagamentos.
          </p>
        </div>
        <Link
          href="/members/payments/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
        >
          Novo Pagamento
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {payments.map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            isAuthor={payment.author.email === session.user.email}
          />
        ))}
      </div>
    </div>
  );
} 