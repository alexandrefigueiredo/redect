'use client';

import { useState } from 'react';
import { createNews, uploadFile } from '@/lib/api';

interface NewsFormProps {
  onSuccess?: () => void;
}

export function NewsForm({ onSuccess }: NewsFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await createNews({
        title,
        content,
        category,
        imageUrl,
      });
      
      setTitle('');
      setContent('');
      setCategory('');
      setImageUrl('');
      onSuccess?.();
    } catch (err) {
      setError('Erro ao criar notícia. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file);
      setImageUrl(result.url);
    } catch (err) {
      setError('Erro ao fazer upload do arquivo. Tente novamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Categoria
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Selecione uma categoria</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Inovação">Inovação</option>
          <option value="Eventos">Eventos</option>
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Conteúdo
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Imagem
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileUpload}
          className="mt-1 block w-full"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? 'Salvando...' : 'Salvar Notícia'}
      </button>
    </form>
  );
} 