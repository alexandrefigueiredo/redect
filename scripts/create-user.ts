import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "test@example.com";
  const password = "123456";
  const name = "Usuário Teste";

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    console.log("Usuário criado com sucesso:", user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 