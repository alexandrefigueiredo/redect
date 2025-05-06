import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PortfolioForm from "../../components/PortfolioForm";

type EditPortfolioPageProps = {
  params: {
    id: string;
  };
};

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const project = await prisma.portfolio.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project) {
    redirect("/members/portfolio");
  }

  if (project.authorId !== session.user.id) {
    redirect("/members/portfolio");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Projeto</h1>
        <p className="mt-1 text-sm text-gray-400">
          Atualize as informações do projeto abaixo.
        </p>
      </div>

      <PortfolioForm
        initialData={{
          title: project.title,
          description: project.description,
          category: project.category,
          imageUrl: project.imageUrl || "",
          link: project.link || "",
        }}
        projectId={project.id}
        submitLabel="Atualizar Projeto"
      />
    </div>
  );
} 