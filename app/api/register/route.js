import { prisma } from "../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const body = await request.json();
    const { email, password } = body

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
        return Response.json({error: "Заполните все поля"}, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
        return Response.json({ error : "Такой Email уже занят"}, { status: 400});
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { email: cleanEmail, password: hashed }
    });

    return Response.json({ ok: true, user: { id: user.id, email: user.email } });
}