import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const projects = await prisma.portfolio.findMany({
      orderBy: {
        publishedAt: "desc",
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

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, category, imageUrl, link } = body;

    if (!title || !description || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const project = await prisma.portfolio.create({
      data: {
        title,
        description,
        category,
        imageUrl,
        link,
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

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Missing project ID", { status: 400 });
    }

    const project = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    if (project.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, imageUrl, link } = body;

    if (!title || !description || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedProject = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        category,
        imageUrl,
        link,
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

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
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
      return new NextResponse("Missing project ID", { status: 400 });
    }

    const project = await prisma.portfolio.findUnique({
      where: { id },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    if (project.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.portfolio.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 