import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    // Buscar token válido
    const resetToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
        expires: {
          gt: new Date(),
        },
      },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "Token inválido ou expirado" },
        { status: 400 }
      );
    }

    // Hash da nova senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Atualizar senha do usuário
    await prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // Remover token usado
    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return NextResponse.json({
      message: "Senha redefinida com sucesso",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return NextResponse.json(
      { error: "Erro ao redefinir senha" },
      { status: 500 }
    );
  }
} 