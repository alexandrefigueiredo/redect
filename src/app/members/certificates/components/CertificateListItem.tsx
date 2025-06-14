"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type CertificateWithAuthor = {
  id: string;
  title: string;
  description: string;
  issueDate: Date;
  issuer: string;
  imageUrl?: string;
  createdAt: Date;
  author: {
    name: string | null;
    email: string;
  };
};

type CertificateListItemProps = {
  certificate: CertificateWithAuthor;
  isAuthor: boolean;
};

export default function CertificateListItem({ certificate, isAuthor }: CertificateListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este certificado?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/members/certificates?id=${certificate.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete certificate");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert("Erro ao excluir certificado");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {certificate.imageUrl && (
        <div className="relative h-48">
          <img
            src={certificate.imageUrl}
            alt={certificate.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">
            {new Date(certificate.issueDate).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{certificate.title}</h3>
        <p className="text-gray-300 mb-4">
          {certificate.description.length > 150
            ? `${certificate.description.substring(0, 150)}...`
            : certificate.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Emitido por {certificate.issuer}
          </span>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                href={`/members/certificates/${certificate.id}/edit`}
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