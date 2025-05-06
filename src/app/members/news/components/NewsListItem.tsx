"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NewsWithAuthor = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  category: string;
  publishedAt: Date;
  author: {
    name: string | null;
    email: string;
  };
};

type NewsListItemProps = {
  news: NewsWithAuthor;
  isAuthor: boolean;
};

export default function NewsListItem({ news, isAuthor }: NewsListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir esta notícia?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/members/news?id=${news.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete news");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Erro ao excluir notícia");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {news.imageUrl && (
        <div className="relative h-48">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-blue-900 text-blue-100 text-sm font-semibold px-3 py-1 rounded-full">
            {news.category}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(news.publishedAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{news.title}</h3>
        <p className="text-gray-300 mb-4">
          {news.content.length > 150
            ? `${news.content.substring(0, 150)}...`
            : news.content}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Por {news.author.name}
          </span>
          {isAuthor && (
            <div className="flex space-x-2">
              <Link
                href={`/members/news/${news.id}/edit`}
                className="text-blue-400 hover:text-blue-300"
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