import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      );
    }

    const { firstName, lastName, email, cpf, birthDate } = await request.json();
    console.log("Dados recebidos:", { firstName, lastName, email, cpf, birthDate });

    // Verificar se o email já está em uso por outro usuário
    if (email !== session.user.email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email,
          NOT: {
            email: session.user.email
          }
        }
      });

      if (existingEmail) {
        return NextResponse.json(
          { error: "Este email já está em uso" },
          { status: 400 }
        );
      }
    }

    // Verificar se o CPF já está em uso por outro usuário
    if (cpf && cpf !== session.user.cpf) {
      const existingUser = await prisma.user.findFirst({
        where: {
          NOT: {
            email: session.user.email
          }
        }
      });

      if (existingUser?.cpf === cpf) {
        return NextResponse.json(
          { error: "Este CPF já está em uso" },
          { status: 400 }
        );
      }
    }

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        firstName,
        lastName,
        email,
        cpf: cpf || null,
        birthDate: birthDate ? new Date(birthDate) : null
      }
    });

    return NextResponse.json({
      message: "Perfil atualizado com sucesso",
      user: {
        id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        cpf: updatedUser.cpf,
        birthDate: updatedUser.birthDate
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar perfil" },
      { status: 500 }
    );
  }
} 