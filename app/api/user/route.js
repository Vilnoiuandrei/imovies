import { NextResponse } from "next/server";
import { auth } from "../../_lib/auth";
import clientPromise from "../../_lib/mongoDB";

export async function GET() {
  try {
    const session = await auth();

    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const client = await clientPromise;
    const db = client.db("imovies");
    const email = session.user.email;
    const user = await db.collection("users").findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
