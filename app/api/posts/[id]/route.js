import { prisma } from "../../../../lib/db"
import { auth } from "../../../../auth"
    
export async function DELETE(request, { params }) {

    const session = await auth();

    if (!session) {
        return Response.json({ error: "Ошибка авторизации"}, { status: 401})
    };

    const { id } = await params;

    const post = await prisma.post.findUnique({
        where: { id }
    });

    if (!post || post.authorId !== session?.user?.id) {
        return Response.json({ error: "Нет доступа"}, { status: 403})
    };

    await prisma.post.delete({
        where: { id }
    });
    return Response.json({ ok:true });
}