import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PaymentForm from "../../components/PaymentForm";

type EditPaymentPageProps = {
  params: {
    id: string;
  };
};

export default async function EditPaymentPage({ params }: EditPaymentPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const payment = await prisma.payment.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!payment) {
    redirect("/members/payments");
  }

  if (payment.authorId !== session.user.id) {
    redirect("/members/payments");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Pagamento</h1>
        <p className="mt-1 text-sm text-gray-400">
          Atualize as informações do pagamento abaixo.
        </p>
      </div>

      <PaymentForm
        initialData={{
          title: payment.title,
          description: payment.description,
          amount: payment.amount.toString(),
          date: payment.date.toISOString().split('T')[0],
          status: payment.status,
        }}
        paymentId={payment.id}
        submitLabel="Atualizar Pagamento"
      />
    </div>
  );
} 