import { auth } from "../auth";

export function withAuth(handler: Function) {
  return async (request: Request, context: any) => {
    // 1. Проверка сессии (турникет)
    const session = await auth();
    if (!session) {
      return Response.json({ error: "Не авторизован" }, { status: 401 });
    }

    // 2. Если сессия есть, передаем её в наш обработчик
    return handler(request, context, session);
  };
}