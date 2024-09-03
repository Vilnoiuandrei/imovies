"use client";
import { useQuery } from "@tanstack/react-query";
import Movie from "./Movie";
import Loader from "./Loader";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieApiResponse {
  results: Movie[];
}

interface MoviesListProps {
  isAuthenticated: boolean;
}

const fetchPopularMovies = async (): Promise<MovieApiResponse> => {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=e40eb02fb75cbc3619cc44a458eb02a4"
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export default function MoviesList({ isAuthenticated }: MoviesListProps) {
  const { data, isLoading, isError } = useQuery<MovieApiResponse>({
    queryKey: ["movies"],
    queryFn: fetchPopularMovies,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Error loading movies.</p>;

  return (
    <div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
        {data?.results.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </ul>
    </div>
  );
}
