"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
};

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
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

  const handlePageChange = (page: number) => {
    router.push(`${baseUrl}?${createQueryString("page", page.toString())}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-md ${
            currentPage === i
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  );
} 