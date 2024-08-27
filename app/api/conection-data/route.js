import { NextResponse } from "next/server";
import clientPromise from "../../_lib/mongoDB";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("traanfers");
    const collections = await db.collections();
    return NextResponse.json({
      collections: collections.map((c) => c.collectionName),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch connection data", error },
      { status: 500 }
    );
  }
}
