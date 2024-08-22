"use client";

import MoviesList from "./_components/MoviesList";
import { useQuery } from "@tanstack/react-query";

const fetchPopularMovies = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=e40eb02fb75cbc3619cc44a458eb02a4"
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
export default function Home() {
  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchPopularMovies(),
    enabled: true,
  });

  return (
    <div>
      <MoviesList movies={data?.results} />
    </div>
  );
}
