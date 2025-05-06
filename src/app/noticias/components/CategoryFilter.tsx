"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type CategoryFilterProps = {
  categories: string[];
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryClick = (category: string | null) => {
    if (category === currentCategory) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("category");
      router.push(`/noticias?${params.toString()}`);
    } else if (category === null) {
      router.push(`/noticias`);
    }
    else {
      router.push(`/noticias?${createQueryString("category", category!)}`);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !currentCategory
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === currentCategory
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 