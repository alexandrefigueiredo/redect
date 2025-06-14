"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type CertificateFormData = {
  title: string;
  description: string;
  issueDate: string;
  issuer: string;
  imageUrl: string;
};

type CertificateFormProps = {
  initialData?: CertificateFormData;
  certificateId?: string;
  submitLabel?: string;
};

export default function CertificateForm({
  initialData,
  certificateId,
  submitLabel = "Criar Certificado",
}: CertificateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CertificateFormData>(
    initialData || {
      title: "",
      description: "",
      issueDate: "",
      issuer: "",
      imageUrl: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = certificateId
        ? `/api/members/certificates?id=${certificateId}`
        : "/api/members/certificates";
      const method = certificateId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save certificate");
      }

      router.push("/members/certificates");
      router.refresh();
    } catch (error) {
      console.error("Error saving certificate:", error);
      setError(error instanceof Error ? error.message : "Failed to save certificate");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-400">
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-400">
            Descrição
          </label>
          <textarea
            name="description"
            id="description"
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="issueDate" className="block text-sm font-medium text-gray-400">
            Data de Emissão
          </label>
          <input
            type="date"
            name="issueDate"
            id="issueDate"
            value={formData.issueDate}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="issuer" className="block text-sm font-medium text-gray-400">
            Emissor
          </label>
          <input
            type="text"
            name="issuer"
            id="issuer"
            value={formData.issuer}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-400">
            URL da Imagem
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-900/50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-200">
                Erro ao salvar certificado
              </h3>
              <div className="mt-2 text-sm text-red-200">{error}</div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-[#BE382A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-[#BE382A] focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
} 