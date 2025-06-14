import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { firstName, lastName, email, cpf, birthDate } = await request.json();

    // Verificar se email já está em uso por outro usuário
    if (email !== session.user.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: "Este email já está em uso" },
          { status: 400 }
        );
      }
    }

    // Verificar se CPF já está em uso por outro usuário
    if (cpf !== session.user.cpf) {
      const existingCPF = await prisma.user.findFirst({
        where: { cpf },
      });

      if (existingCPF) {
        return NextResponse.json(
          { error: "Este CPF já está em uso" },
          { status: 400 }
        );
      }
    }

    // Atualizar usuário
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        email,
        cpf,
        birthDate: new Date(birthDate),
      },
    });

    return NextResponse.json({
      message: "Perfil atualizado com sucesso",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cpf: user.cpf,
        birthDate: user.birthDate,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
} 