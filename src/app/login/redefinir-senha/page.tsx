"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais"
      );
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/redefinir-senha", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao redefinir senha");
      }

      router.push("/login?redefinicao=success");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Link Inválido
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              O link de redefinição de senha é inválido ou expirou.
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/login/recuperar-senha"
              className="font-medium text-[#BE382A] hover:text-[#A32E22]"
            >
              Solicitar novo link
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Redefinir Senha
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Digite sua nova senha
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              Nova Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="Nova Senha"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar Nova Senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="Confirmar Nova Senha"
            />
          </div>

          {error && (
            <div className="text-sm text-center text-red-600">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#BE382A] hover:bg-[#A32E22] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BE382A] disabled:opacity-50"
            >
              {loading ? "Redefinindo senha..." : "Redefinir senha"}
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