import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });

    if (!user?.password) {
      return NextResponse.json(
        { error: "Usuário não encontrado ou não possui senha" },
        { status: 400 }
      );
    }

    // Verificar senha atual
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Senha atual incorreta" },
        { status: 400 }
      );
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar senha
    await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        password: hashedPassword
      }
    });

    return NextResponse.json({
      message: "Senha atualizada com sucesso"
    });
  } catch (error) {
    console.error("Erro ao atualizar senha:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar senha" },
      { status: 500 }
    );
  }
} 