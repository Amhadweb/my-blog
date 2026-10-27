import { prisma } from "../../../lib/db";
import { withAuth } from "../../../lib/api-helpers";

export const GET = withAuth(async (request, context, session) => {
    // Проверку сессии уже сделала обертка!
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: { author: true }
    });
    return Response.json(posts);
});

export const POST = withAuth(async (request, context, session) => {
    // Проверку сессии уже сделала обертка!
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
        return Response.json({ error: "Заполните все поля" }, { status: 400 });
    }

    const post = await prisma.post.create({
        data: { title, content, authorId: session.user.id }
    });
    return Response.json({ ok: true, post });
});