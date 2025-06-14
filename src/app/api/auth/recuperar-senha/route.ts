import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Retornamos sucesso mesmo se o email não existir por questões de segurança
      return NextResponse.json({
        message: "Se o email estiver cadastrado, você receberá as instruções para recuperar sua senha.",
      });
    }

    // Gerar token único
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hora

    // Salvar token no banco
    await prisma.passwordResetToken.create({
      data: {
        token,
        expires,
        userId: user.id,
      },
    });

    // Enviar email com link de recuperação
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/login/redefinir-senha?token=${token}`;
    await sendEmail({
      to: email,
      subject: "Recuperação de Senha",
      html: `
        <p>Olá,</p>
        <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>Este link expira em 1 hora.</p>
        <p>Se você não solicitou a recuperação de senha, ignore este email.</p>
      `,
    });

    return NextResponse.json({
      message: "Se o email estiver cadastrado, você receberá as instruções para recuperar sua senha.",
    });
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error);
    return NextResponse.json(
      { error: "Erro ao processar a solicitação" },
      { status: 500 }
    );
  }
} 