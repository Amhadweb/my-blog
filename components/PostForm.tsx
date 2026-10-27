"use client";

import { createPostAction } from "../app/actions";
import { useState } from "react";

export default function PostForm() {
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {

    const result = await createPostAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
  <form action={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-3">
    {error && <p className="text-red-500 text-sm">{error}</p>}
    
    <input
      type="text"
      name="title"
      placeholder="Заголовок поста"
      className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <textarea
      name="content"
      placeholder="Текст поста..."
      rows={3}
      className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Опубликовать
    </button>
  </form>
);
}