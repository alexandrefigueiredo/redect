import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import FileListItem from "./components/FileListItem";

export default async function FilesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Arquivos</h1>
          <p className="mt-1 text-sm text-gray-400">
            Gerencie seus arquivos compartilhados.
          </p>
        </div>
        <Link
          href="/members/files/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Novo Arquivo
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {files.map((file) => (
          <FileListItem
            key={file.id}
            file={file}
            isAuthor={file.author.email === session.user.email}
          />
        ))}
      </div>
    </div>
  );
} 