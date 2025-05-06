"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    router.push(`/noticias?${createQueryString("search", search)}`);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          name="search"
          placeholder="Buscar notícias..."
          defaultValue={searchParams.get("search") ?? ""}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>
    </form>
  );
} 