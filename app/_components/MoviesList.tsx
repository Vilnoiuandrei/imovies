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

const fetchPopularMovies = async (
  apiKey: string | undefined
): Promise<MovieApiResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

export default function MoviesList({ isAuthenticated }: MoviesListProps) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const { data, isLoading, isError } = useQuery<MovieApiResponse>({
    queryKey: ["movies"],
    queryFn: () => fetchPopularMovies(apiKey),
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
