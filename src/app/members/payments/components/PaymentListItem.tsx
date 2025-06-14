"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PaymentWithAuthor = {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  status: string;
  createdAt: Date;
  author: {
    name: string | null;
    email: string;
  };
};

type PaymentListItemProps = {
  payment: PaymentWithAuthor;
  isAuthor: boolean;
};

export default function PaymentListItem({ payment, isAuthor }: PaymentListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este pagamento?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/members/payments?id=${payment.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete payment");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("Erro ao excluir pagamento");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'overdue':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      default:
        return status;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`inline-block ${getStatusColor(payment.status)} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
            {getStatusText(payment.status)}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(payment.date).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{payment.title}</h3>
        <p className="text-gray-300 mb-4">
          {payment.description.length > 150
            ? `${payment.description.substring(0, 150)}...`
            : payment.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-white">
            {formatCurrency(payment.amount)}
          </span>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                href={`/members/payments/${payment.id}/edit`}
                className="text-[#BE382A] hover:text-[#A32E22]"
              >
                Editar
              </Link>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-400 hover:text-red-300 disabled:opacity-50"
              >
                {isDeleting ? "Excluindo..." : "Excluir"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 