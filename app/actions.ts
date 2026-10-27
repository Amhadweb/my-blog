"use server"; // <-- Обязательно!

import { prisma } from "../lib/db";
import { auth } from "../auth";
import { revalidatePath } from "next/cache"; // <-- Магия обновления страниц

export async function createPostAction(formData: FormData) {
  // 1. Проверяем сессию (как в API)
  const session = await auth();
  if (!session) return { error: "Не авторизован" };

  // 2. Получаем данные (без request.json)
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) return { error: "Заполните все поля" };

  // 3. Сохраняем в базу
  await prisma.post.create({
    data: { title, content, authorId: session?.user?.id }
  });

  // 4. Говорим Next.js: "Обнови данные на главной странице!"
  revalidatePath("/"); 
  return { ok: true };
}