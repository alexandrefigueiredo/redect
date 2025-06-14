import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename
    const uniqueId = uuidv4();
    const extension = file.name.split(".").pop();
    const filename = `${uniqueId}.${extension}`;

    // Save the file
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Return the URL
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error uploading file:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 