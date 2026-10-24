import { prisma } from "../../../lib/db"
import { auth } from "../../../auth"

export async function GET() {

    const session = await auth();
    if (!session) {
        return Response.json({ error: "Ошибка авторизации" }, { status: 401 });
    };
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {author: true}
    });
    return Response.json(posts);
};

export async function POST(request) {

    const session = await auth();
    if (!session) {
        return Response.json({ error: "Ошибка авторизации" }, { status: 401 })
    };
    const body = await request.json();

    const { title, content } = body;

    if (!title || !content) {
        return Response.json({ error: "Заполните все поля"}, { status: 400 })
    };
    const post = await prisma.post.create({
        data: { title: title, content: content, authorId: session?.user?.id }
    });

    return Response.json({ ok: true, post })
}