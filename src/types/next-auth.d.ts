import { UserRole } from "@prisma/client";
import "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      firstName: string;
      lastName: string;
      email: string;
      image?: string;
      role: string;
      cpf?: string;
      birthDate?: Date;
    };
  }

  interface User {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    image?: string;
    role: string;
    cpf?: string;
    birthDate?: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    firstName?: string | null;
    lastName?: string | null;
    cpf?: string | null;
    birthDate?: Date | null;
  }
} 