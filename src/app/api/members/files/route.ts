import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile } from "fs/promises";
import { join } from "path";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const files = await prisma.file.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, description, url, type, size } = body;
    console.log("Request body:", { name, description, url, type, size });
    console.log("User ID:", session.user.id);

    if (!name || !url || !type || !size) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    console.log("User found:", user);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const file = await prisma.file.create({
      data: {
        name,
        description: description || null,
        url,
        type,
        size,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(file);
  } catch (error) {
    console.error("Error creating file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing file ID", { status: 400 });
    }

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      return new NextResponse("File not found", { status: 404 });
    }

    if (file.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.file.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 