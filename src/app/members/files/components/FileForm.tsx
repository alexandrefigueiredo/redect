"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FileFormData = {
  name: string;
  type: string;
  size: number;
  path: string;
};

export default function FileForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FileFormData>({
    name: "",
    type: "",
    size: 0,
    path: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/members/files", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to save file");
      }

      router.push("/members/files");
      router.refresh();
    } catch (error) {
      console.error("Error saving file:", error);
      setError(error instanceof Error ? error.message : "Failed to save file");
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
              Informações do Arquivo
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Preencha os campos abaixo para adicionar um novo arquivo.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Nome do Arquivo
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-300"
              >
                Tipo do Arquivo
              </label>
              <div className="mt-1">
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Selecione um tipo</option>
                  <option value="document">Documento</option>
                  <option value="image">Imagem</option>
                  <option value="video">Vídeo</option>
                  <option value="audio">Áudio</option>
                  <option value="other">Outro</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="path"
                className="block text-sm font-medium text-gray-300"
              >
                Caminho do Arquivo
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="path"
                  id="path"
                  required
                  value={formData.path}
                  onChange={(e) =>
                    setFormData({ ...formData, path: e.target.value })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Caminho onde o arquivo está armazenado
              </p>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="size"
                className="block text-sm font-medium text-gray-300"
              >
                Tamanho (em bytes)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="size"
                  id="size"
                  required
                  min="0"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: parseInt(e.target.value, 10) })
                  }
                  className="block w-full rounded-md border-gray-700 bg-gray-800 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-900/50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-200">
                Erro ao salvar arquivo
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
            {isSubmitting ? "Salvando..." : "Criar Arquivo"}
          </button>
        </div>
      </div>
    </form>
  );
} 