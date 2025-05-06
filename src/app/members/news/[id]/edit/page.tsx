import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import NewsForm from "../../components/NewsForm";

type EditNewsPageProps = {
  params: {
    id: string;
  };
};

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const news = await prisma.news.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!news) {
    redirect("/members/news");
  }

  if (news.authorId !== session.user.id) {
    redirect("/members/news");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Notícia</h1>
        <p className="mt-1 text-sm text-gray-400">
          Atualize as informações da notícia abaixo.
        </p>
      </div>

      <NewsForm
        initialData={{
          title: news.title,
          content: news.content,
          category: news.category,
          imageUrl: news.imageUrl || "",
        }}
        newsId={news.id}
        submitLabel="Atualizar Notícia"
      />
    </div>
  );
} 