"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PortfolioFormData = {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  technologies: string;
};

type PortfolioFormProps = {
  initialData?: PortfolioFormData;
  projectId?: string;
  submitLabel?: string;
};

export default function PortfolioForm({
  initialData,
  projectId,
  submitLabel = "Criar Projeto",
}: PortfolioFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PortfolioFormData>(
    initialData || {
      title: "",
      description: "",
      category: "",
      imageUrl: "",
      link: "",
      technologies: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = projectId
        ? `/api/members/portfolio?id=${projectId}`
        : "/api/members/portfolio";
      const method = projectId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save project");
      }

      router.push("/members/portfolio");
      router.refresh();
    } catch (error) {
      console.error("Error saving project:", error);
      setError(error instanceof Error ? error.message : "Failed to save project");
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
              Informações do Projeto
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Preencha os campos abaixo para {projectId ? "atualizar" : "criar"} o projeto.
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
                  <option value="Legislações">Legislações</option>
                  <option value="Mapas">Mapas</option>
                  <option value="Povos Originários">Povos Originários</option>
                  <option value="Comunidades Tradicionais">Comunidades Tradicionais</option>
                  <option value="Grupos de Pesquisa">Grupos de Pesquisa</option>
                  <option value="Redes e Coletivos">Redes e Coletivos</option>
                  <option value="Museus">Museus</option>
                  <option value="Destaques">Destaques</option>
                  <option value="Centro de Referência">Centro de Referência</option>
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
                URL da imagem do projeto (opcional)
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-300"
              >
                Link do Projeto
              </label>
              <div className="mt-1">
                <input
                  type="url"
                  name="link"
                  id="link"
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                URL do projeto (opcional)
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="technologies"
                className="block text-sm font-medium text-gray-300"
              >
                Tecnologias
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="technologies"
                  id="technologies"
                  required
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Lista de tecnologias separadas por vírgula (ex: React, Node.js, TypeScript)
              </p>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300"
              >
                Descrição
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Descrição detalhada do projeto
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
                Erro ao salvar projeto
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