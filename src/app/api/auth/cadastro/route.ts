import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, cpf, birthDate } = await request.json();
    console.log("Dados recebidos:", { firstName, lastName, email, cpf, birthDate });

    // Check if email already exists
    const existingEmail = await prisma.user.findFirst({
      where: { email }
    });

    if (existingEmail) {
      return NextResponse.json(
        { error: "Este email já está em uso" },
        { status: 400 }
      );
    }

    // Check if CPF already exists using raw query
    const existingCPF = await prisma.$queryRaw`
      SELECT * FROM User WHERE cpf = ${cpf}
    `;

    if (Array.isArray(existingCPF) && existingCPF.length > 0) {
      return NextResponse.json(
        { error: "Este CPF já está em uso" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using raw query
    const user = await prisma.$executeRaw`
      INSERT INTO User (
        id, firstName, lastName, email, password, cpf, birthDate, role, createdAt, updatedAt
      ) VALUES (
        ${crypto.randomUUID()},
        ${firstName},
        ${lastName},
        ${email},
        ${hashedPassword},
        ${cpf},
        ${new Date(birthDate)},
        'USER',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
    `;

    console.log("Usuário criado com sucesso");

    return NextResponse.json(
      { message: "Usuário criado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro detalhado ao criar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao criar usuário", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
} 