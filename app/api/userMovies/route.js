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

  const result = await db.collection("users").updateOne(
    { email: session.user.email }, // Find the user by their email
    { $addToSet: { movies: movieId } } // Add the movie ID to the array, ensuring no duplicates
  );

  if (result.modifiedCount === 0) {
    return new Response(
      JSON.stringify({ error: "Failed to add movie to user's list" }),
      { status: 500 }
    );
  }

  return new Response(
    JSON.stringify({ message: "Movie added to user's list successfully" }),
    { status: 200 }
  );
}

export async function GET() {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const client = await clientPromise;
  const db = client.db("ITMB");

  const user = await db.collection("users").findOne(
    { email: session.user.email }, // Find the user by their email
    { projection: { movies: 1 } } // Only return the movies array
  );

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ movies: user.movies || [] }), {
    status: 200,
  });
}
