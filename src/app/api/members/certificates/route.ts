import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, issueDate, issuer, imageUrl } = body;

    const certificate = await prisma.certificate.create({
      data: {
        title,
        description,
        issueDate: new Date(issueDate),
        issuer,
        imageUrl,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(certificate);
  } catch (error) {
    console.error("Error creating certificate:", error);
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
      return new NextResponse("Certificate ID is required", { status: 400 });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      return new NextResponse("Certificate not found", { status: 404 });
    }

    if (certificate.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, description, issueDate, issuer, imageUrl } = body;

    const updatedCertificate = await prisma.certificate.update({
      where: { id },
      data: {
        title,
        description,
        issueDate: new Date(issueDate),
        issuer,
        imageUrl,
      },
    });

    return NextResponse.json(updatedCertificate);
  } catch (error) {
    console.error("Error updating certificate:", error);
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
      return new NextResponse("Certificate ID is required", { status: 400 });
    }

    const certificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      return new NextResponse("Certificate not found", { status: 404 });
    }

    if (certificate.authorId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.certificate.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 