"use client";

import { useState } from "react";
import Link from "next/link";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/recuperar-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao processar a solicitação");
      }

      setMessage({
        type: "success",
        text: "Se o email estiver cadastrado, você receberá as instruções para recuperar sua senha.",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Erro ao processar a solicitação",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recuperar Senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite seu email para receber as instruções de recuperação de senha
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="Email"
            />
          </div>

          {message && (
            <div className={`text-sm text-center ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}>
              {message.text}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A] disabled:opacity-50"
            >
              {loading ? "Enviando..." : "Enviar instruções"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="font-medium text-[#BE382A] hover:text-[#A32E22]"
            >
              Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 