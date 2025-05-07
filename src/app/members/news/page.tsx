import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import NewsListItem from "./components/NewsListItem";

const prisma = new PrismaClient();

type NewsWithAuthor = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  category: string;
  publishedAt: Date;
  author: {
    name: string | null;
    email: string | null;
  };
};

export default async function NewsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const news = await prisma.news.findMany({
    include: {
      author: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Notícias</h1>
          <p className="mt-1 text-sm text-gray-400">
            Gerencie as notícias do site.
          </p>
        </div>
        <Link
          href="/members/news/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Nova Notícia
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item: NewsWithAuthor) => (
          <NewsListItem
            key={item.id}
            news={item}
            isAuthor={item.author.email === session.user.email}
          />
        ))}
      </div>
    </div>
  );
} 