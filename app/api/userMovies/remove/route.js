import { auth } from "@/app/_lib/auth";
import clientPromise from "@/app/_lib/mongoDB";

export async function POST(req) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { movieId } = await req.json();

  if (!movieId) {
    return new Response(JSON.stringify({ error: "Movie ID is required" }), {
      status: 400,
    });
  }

  const client = await clientPromise;
  const db = client.db("ITMB");

  const result = await db
    .collection("users")
    .updateOne({ email: session.user.email }, { $pull: { movies: movieId } });

  if (result.modifiedCount === 0) {
    return new Response(
      JSON.stringify({ error: "Failed to remove movie from user's list" }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Movie removed from user's list successfully" }),
    { status: 200 }
  );
}
