import { Suspense } from "react";
import { auth } from "./_lib/auth";
import MoviesList from "./_components/MoviesList";
import Loader from "./_components/Loader";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MoviesList isAuthenticated={!!user} />
      </Suspense>
    </div>
  );
}
