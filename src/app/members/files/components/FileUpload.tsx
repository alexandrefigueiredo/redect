"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/members/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      router.refresh();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Erro ao fazer upload do arquivo");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg ${
        dragActive
          ? "border-blue-500 bg-blue-900/20"
          : "border-gray-600 hover:border-gray-500"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleChange}
        disabled={isUploading}
      />
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg
          className={`w-8 h-8 mb-3 ${
            dragActive ? "text-blue-400" : "text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="mb-2 text-sm text-gray-300">
          <span className="font-semibold">Clique para fazer upload</span> ou arraste
          e solte
        </p>
        <p className="text-xs text-gray-400">PDF, DOC, DOCX, XLS, XLSX, etc.</p>
      </div>
      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/75">
          <div className="text-blue-400">Enviando...</div>
        </div>
      )}
    </div>
  );
} 