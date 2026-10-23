import { auth } from "../auth"
import { redirect } from "next/navigation"

export const instant = false
export default async function Home() {

  const session = await auth();

  if (!session) {
    redirect("/login")
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div>
        <h1>Блог</h1>
        <p>Вы вошли как: {session?.user?.email} </p>
      </div>
    </main>
  )
}