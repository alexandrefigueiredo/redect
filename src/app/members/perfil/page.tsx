"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

type News = {
  id: string;
  title: string;
  content: string;
  category: string;
  imageUrl?: string;
  publishedAt: string;
  authorId: string;
};

type Portfolio = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  technologies: string;
  link?: string;
  authorId: string;
};

type File = {
  id: string;
  name: string;
  description?: string;
  url: string;
  type: string;
  size: number;
  createdAt: string;
  authorId: string;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cpf: "",
    birthDate: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userContent, setUserContent] = useState({
    news: [] as News[],
    portfolio: [] as Portfolio[],
    files: [] as File[],
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      console.log("Dados do usuário:", session.user);
      setFormData({
        firstName: session.user.firstName || "",
        lastName: session.user.lastName || "",
        email: session.user.email || "",
        cpf: session.user.cpf || "",
        birthDate: session.user.birthDate 
          ? format(new Date(session.user.birthDate), "yyyy-MM-dd")
          : "",
      });

      // Fetch user's content
      fetchUserContent();
    }
  }, [session]);

  const fetchUserContent = async () => {
    try {
      const [newsRes, portfolioRes, filesRes] = await Promise.all([
        fetch("/api/members/news"),
        fetch("/api/members/portfolio"),
        fetch("/api/members/files"),
      ]);

      const [news, portfolio, files] = await Promise.all([
        newsRes.json(),
        portfolioRes.json(),
        filesRes.json(),
      ]);

      setUserContent({
        news: news.filter((item: News) => item.authorId === session?.user?.id),
        portfolio: portfolio.filter((item: Portfolio) => item.authorId === session?.user?.id),
        files: files.filter((item: File) => item.authorId === session?.user?.id),
      });
    } catch (error) {
      console.error("Error fetching user content:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Perfil atualizado com sucesso!" });
        setIsEditing(false);
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao atualizar perfil" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao atualizar perfil" });
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "As senhas não coincidem" });
      return;
    }

    try {
      const response = await fetch("/api/auth/perfil/senha", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Senha atualizada com sucesso!" });
        setIsChangingPassword(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage({ type: "error", text: data.error || "Erro ao atualizar senha" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao atualizar senha" });
    }
  };

  if (status === "loading") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Perfil</h1>
            <p className="mt-1 text-sm text-gray-400">
              Carregando...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Perfil</h1>
            <p className="mt-1 text-sm text-gray-400">
              Gerencie suas informações pessoais.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-6">
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-md ${
                message.type === "success" ? "bg-green-900/50" : "bg-red-900/50"
              }`}
            >
              <p
                className={`text-sm ${
                  message.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message.text}
              </p>
            </div>
          )}

          {!isEditing && !isChangingPassword && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Foto de perfil"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
                      {session?.user?.firstName?.[0] || session?.user?.name?.[0] || "?"}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-sm text-gray-400">{formData.email}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {session?.user?.role === "ADMIN" ? "Administrador" : "Usuário"}
                  </p>
                </div>
              </div>

              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-400">CPF</dt>
                  <dd className="mt-1 text-sm text-white">{formData.cpf || "Não informado"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">
                    Data de Nascimento
                  </dt>
                  <dd className="mt-1 text-sm text-white">
                    {formData.birthDate
                      ? format(new Date(formData.birthDate), "dd 'de' MMMM 'de' yyyy", {
                          locale: ptBR,
                        })
                      : "Não informada"}
                  </dd>
                </div>
              </dl>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
                >
                  Editar Perfil
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Alterar Senha
                </button>
              </div>
            </div>
          )}

          {isEditing && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-400">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-400">
                    Sobrenome
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-gray-400">
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    id="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="birthDate" className="block text-sm font-medium text-gray-400">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}

          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-400">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-400">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
                    Confirmar Nova Senha
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-[#BE382A] focus:ring-[#BE382A] sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
                >
                  Alterar Senha
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* News Section */}
      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Minhas Notícias</h2>
            <Link
              href="/members/news/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
            >
              Nova Notícia
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userContent.news.map((news) => (
              <div key={news.id} className="bg-gray-700 rounded-lg overflow-hidden">
                {news.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={news.imageUrl}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{news.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {news.content.length > 150
                      ? `${news.content.substring(0, 150)}...`
                      : news.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {format(new Date(news.publishedAt), "dd/MM/yyyy")}
                    </span>
                    <Link
                      href={`/members/news/${news.id}/edit`}
                      className="text-[#BE382A] hover:text-[#A32E22]"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Meu Portfólio</h2>
            <Link
              href="/members/portfolio/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
            >
              Novo Projeto
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userContent.portfolio.map((project) => (
              <div key={project.id} className="bg-gray-700 rounded-lg overflow-hidden">
                {project.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    {project.description.length > 150
                      ? `${project.description.substring(0, 150)}...`
                      : project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{project.technologies}</span>
                    <Link
                      href={`/members/portfolio/${project.id}/edit`}
                      className="text-[#BE382A] hover:text-[#A32E22]"
                    >
                      Editar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Files Section */}
      <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Meus Arquivos</h2>
            <Link
              href="/members/files/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A]"
            >
              Novo Arquivo
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userContent.files.map((file) => (
              <div key={file.id} className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{file.name}</h3>
                  {file.description && (
                    <p className="text-sm text-gray-300 mb-4">{file.description}</p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">
                      {format(new Date(file.createdAt), "dd/MM/yyyy")}
                    </span>
                    <div className="flex space-x-2">
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#BE382A] hover:text-[#A32E22]"
                      >
                        Download
                      </a>
                      <Link
                        href={`/members/files/${file.id}/edit`}
                        className="text-[#BE382A] hover:text-[#A32E22]"
                      >
                        Editar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 