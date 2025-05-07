"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FileWithAuthor = {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  createdAt: Date;
  author: {
    name: string | null;
    email: string;
  };
};

type FileListItemProps = {
  file: FileWithAuthor;
  isAuthor: boolean;
};

export default function FileListItem({ file, isAuthor }: FileListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este arquivo?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/members/files?id=${file.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Erro ao excluir arquivo");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">
          {file.name}
        </h3>
        <span className="text-sm text-gray-400">
          {new Date(file.createdAt).toLocaleDateString("pt-BR")}
        </span>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="inline-block bg-blue-900 text-blue-100 text-sm font-semibold px-3 py-1 rounded-full">
          {file.type}
        </span>
        <span className="text-sm text-gray-400">
          {formatFileSize(file.size)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          Por {file.author.name}
        </span>
        <div className="flex space-x-4">
          <a
            href={file.path}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Download
          </a>
          {isAuthor && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-400 hover:text-red-300 disabled:opacity-50"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 