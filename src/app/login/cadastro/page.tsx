"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    cpf: "",
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

  const formatCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          birthDate: formData.birthDate,
          cpf: formData.cpf.replace(/\D/g, ""),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar conta");
      }

      router.push("/login?cadastro=success");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Criar Conta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os dados abaixo para criar sua conta
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="sr-only">
                Nome
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
                placeholder="Nome"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                Sobrenome
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
                placeholder="Sobrenome"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="cpf" className="sr-only">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              required
              value={formData.cpf}
              onChange={(e) => {
                const formatted = formatCPF(e.target.value);
                if (formatted.length <= 14) {
                  handleChange({
                    target: { name: "cpf", value: formatted },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="CPF"
            />
          </div>

          <div>
            <label htmlFor="birthDate" className="sr-only">
              Data de Nascimento
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              required
              value={formData.birthDate}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="Senha"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirmar Senha
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#BE382A] focus:border-[#BE382A] focus:z-10 sm:text-sm"
              placeholder="Confirmar Senha"
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
              {loading ? "Criando conta..." : "Criar conta"}
            </button>
          </div>

          <div className="text-sm text-center">
            <Link
              href="/login"
              className="font-medium text-[#BE382A] hover:text-[#A32E22]"
            >
              Já tem uma conta? Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
} 