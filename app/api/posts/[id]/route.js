import { prisma } from "../../../../lib/db";
import { withAuth } from "../../../../lib/api-helpers";

export const DELETE = withAuth(async (request, context, session) => {

    const { id } = await context.params; 

    const post = await prisma.post.findUnique({
        where: { id }
    });

    if (!post || post.authorId !== session.user.id) {
        return Response.json({ error: "Нет доступа"}, { status: 403})
    }

    await prisma.post.delete({
        where: { id }
    });
    
    return Response.json({ ok: true });
});