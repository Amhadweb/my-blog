"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm() {
    const [ title, setTitle] = useState("");
    const [ content, setContent] = useState("");
    const [ error, setError ] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!title || !content) {
            setError("Заполните все поля");
            return;
        };

        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({ title, content }),
        });

        const data = await res.json();

        if(!res.ok) {
            setError(data.error || "Ошибка при создании поста");
            return;
        };

        setTitle("");
        setContent("");
        router.refresh()
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 space-y-3">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок поста"
                className="w-full border border-gray-300 dark:border-gray-600 bg-transparent rounded px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
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