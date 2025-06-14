import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import CertificateForm from "../../components/CertificateForm";

type EditCertificatePageProps = {
  params: {
    id: string;
  };
};

export default async function EditCertificatePage({ params }: EditCertificatePageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const certificate = await prisma.certificate.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!certificate) {
    redirect("/members/certificates");
  }

  if (certificate.authorId !== session.user.id) {
    redirect("/members/certificates");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Editar Certificado</h1>
        <p className="mt-1 text-sm text-gray-400">
          Atualize as informações do certificado abaixo.
        </p>
      </div>

      <CertificateForm
        initialData={{
          title: certificate.title,
          description: certificate.description,
          issueDate: certificate.issueDate.toISOString().split('T')[0],
          issuer: certificate.issuer,
          imageUrl: certificate.imageUrl || "",
        }}
        certificateId={certificate.id}
        submitLabel="Atualizar Certificado"
      />
    </div>
  );
} 