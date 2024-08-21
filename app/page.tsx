"use client";

import MoviesList from "./_components/MoviesList";
import Search from "./_components/Search";
import { useQuery } from "@tanstack/react-query";

const fetchPopularMovies = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=e40eb02fb75cbc3619cc44a458eb02a4"
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
export default function Home() {
  const { data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchPopularMovies(),
    enabled: true,
  });
  return (
    <div>
      <div className="flex w-screen justify-around mt-4">
        <h1 className="bg-yellow-500 text-black text-3xl px-2 py-2 rounded-sm">
          IMovies
        </h1>
        <Search />
      </div>
      <MoviesList movies={data?.results} />
    </div>
  );
}
