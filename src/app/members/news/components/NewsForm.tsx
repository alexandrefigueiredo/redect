"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type NewsFormData = {
  title: string;
  content: string;
  category: string;
  imageUrl: string;
};

type NewsFormProps = {
  initialData?: NewsFormData;
  newsId?: string;
  submitLabel?: string;
};

export default function NewsForm({
  initialData,
  newsId,
  submitLabel = "Criar Notícia",
}: NewsFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsFormData>(
    initialData || {
      title: "",
      content: "",
      category: "",
      imageUrl: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = newsId
        ? `/api/members/news?id=${newsId}`
        : "/api/members/news";
      const method = newsId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save news");
      }

      router.push("/members/news");
      router.refresh();
    } catch (error) {
      console.error("Error saving news:", error);
      setError(error instanceof Error ? error.message : "Failed to save news");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-8 divide-y divide-gray-700">
      <div className="space-y-8 divide-y divide-gray-700">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-white">
              Informações da Notícia
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Preencha os campos abaixo para {newsId ? "atualizar" : "criar"} a notícia.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Título
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-300"
              >
                Categoria
              </label>
              <div className="mt-1">
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="tecnologia">Tecnologia</option>
                  <option value="negocios">Negócios</option>
                  <option value="saude">Saúde</option>
                  <option value="educacao">Educação</option>
                  <option value="entretenimento">Entretenimento</option>
                  <option value="esportes">Esportes</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-300"
              >
                URL da Imagem
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="imageUrl"
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                URL da imagem de capa da notícia (opcional)
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Conteúdo
              </label>
              <div className="mt-1">
                <textarea
                  id="content"
                  name="content"
                  rows={10}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Conteúdo completo da notícia
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-900/50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-200">
                Erro ao salvar notícia
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
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? "Salvando..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
} 