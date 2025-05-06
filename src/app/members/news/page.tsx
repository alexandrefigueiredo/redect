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
    email: string;
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
        <h1 className="text-3xl font-bold text-white">Notícias</h1>
        <Link
          href="/members/news/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
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