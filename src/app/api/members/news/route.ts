import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const news = await prisma.news.findMany({
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

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
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
    const { title, content, category, imageUrl } = body;

    if (!title || !content || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        category,
        imageUrl,
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

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error creating news:", error);
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
      return new NextResponse("Missing news ID", { status: 400 });
    }

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return new NextResponse("News not found", { status: 404 });
    }

    if (news.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, content, category, imageUrl } = body;

    if (!title || !content || !category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        content,
        category,
        imageUrl,
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

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
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
      return new NextResponse("Missing news ID", { status: 400 });
    }

    const news = await prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      return new NextResponse("News not found", { status: 404 });
    }

    if (news.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.news.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting news:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 