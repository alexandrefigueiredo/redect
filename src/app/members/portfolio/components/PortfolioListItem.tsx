"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type PortfolioWithAuthor = {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  category: string;
  link: string | null;
  technologies: string;
  publishedAt: Date;
  author: {
    name: string | null;
    email: string;
  };
};

type PortfolioListItemProps = {
  project: PortfolioWithAuthor;
  isAuthor: boolean;
};

export default function PortfolioListItem({ project, isAuthor }: PortfolioListItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/members/portfolio?id=${project.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Erro ao excluir projeto");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {project.imageUrl && (
        <div className="relative h-48">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-block bg-blue-900 text-blue-100 text-sm font-semibold px-3 py-1 rounded-full">
            {project.category}
          </span>
          <span className="text-sm text-gray-400">
            {new Date(project.publishedAt).toLocaleDateString("pt-BR")}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-300 mb-4">
          {project.description.length > 150
            ? `${project.description.substring(0, 150)}...`
            : project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.split(',').map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-900 text-blue-100 rounded-full text-sm"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Por {project.author.name}
          </span>
          <div className="flex space-x-4">
            {isAuthor && (
              <>
                <Link
                  href={`/members/portfolio/${project.id}/edit`}
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 