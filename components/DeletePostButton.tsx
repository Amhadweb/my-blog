"use client";

import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Вы уверены, что хотите удалить этот пост?")) return;

    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Ошибка при удалении");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 hover:text-red-700 text-sm transition"
    >
      Удалить
    </button>
  );
}