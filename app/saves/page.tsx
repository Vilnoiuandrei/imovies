import { Suspense } from "react";
import { auth } from "./../_lib/auth";
import Loader from "./../_components/Loader";
import MoviesSavedList from "../_components/MovieSavedList";

export default async function Saves() {
  const session = await auth();
  const user = session?.user;

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <MoviesSavedList isAuthenticated={!!user} />
      </Suspense>
    </div>
  );
}
