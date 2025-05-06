import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import NewsForm from "../components/NewsForm";
import { headers } from "next/headers";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function NewNewsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const headersList = headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  async function createNews(data: {
    title: string;
    content: string;
    imageUrl: string;
    category: string;
  }) {
    "use server";

    try {
      const cookieStore = cookies();
      const sessionToken = cookieStore.get("next-auth.session-token")?.value;

      const response = await fetch(`${protocol}://${host}/api/members/news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `next-auth.session-token=${sessionToken}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create news");
      }

      return response.json();
    } catch (error) {
      console.error("Error creating news:", error);
      throw error;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Nova Notícia</h1>
        <p className="mt-1 text-sm text-gray-500">
          Crie uma nova notícia para o site
        </p>
      </div>

      <NewsForm onSubmit={createNews} submitLabel="Publicar" />
    </div>
  );
} 