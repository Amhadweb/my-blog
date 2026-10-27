import { auth } from "../auth"
import { redirect } from "next/navigation"
import PostForm from "../components/PostForm"
import { prisma } from "../lib/db"
import DeletePostButton from "../components/DeletePostButton"
import { truncate } from "../lib/utils"

export const instant = false
export default async function Home() {

  const session = await auth();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: true }
  })

  if (!session) {
    redirect("/login")
  };

  return (
  <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
    <div className="max-w-2xl mx-auto">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Мой Блог
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {session?.user?.email}
        </p>
      </div>

      <PostForm />

      <div className="space-y-4 mt-8">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Постов пока нет. Напишите первый!
          </p>
        ) : (
          posts.map((post: any) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors"
            >
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                {post.title}
              </h2>

              {post.authorId === session?.user?.id && (
                <DeletePostButton postId={post.id} />
              )}
              
              <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>Автор: {post.author.email}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {truncate(post.content, 100)}
              </p>
            </div>
          ))
        )}
      </div>

    </div>
  </main>
);
}