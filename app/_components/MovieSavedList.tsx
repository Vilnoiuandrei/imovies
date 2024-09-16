"use client";
import { useEffect, useState } from "react";
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

interface MoviesSavedListProps {
  isAuthenticated: boolean;
}

const fetchMovieDetails = async (
  id: number,
  apiKey: string
): Promise<Movie> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
};

export default function MoviesSavedList({
  isAuthenticated,
}: MoviesSavedListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  useEffect(() => {
    const fetchSavedMovies = async () => {
      try {
        const res = await fetch("/api/userMovies");
        if (!res.ok) {
          throw new Error("Failed to fetch saved movie IDs");
        }

        const { movies: savedMovieIds } = await res.json();

        // Fetch all movie details by their ID
        const moviePromises = savedMovieIds.map((id: number) =>
          fetchMovieDetails(id, apiKey!)
        );

        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedMovies();
  }, [apiKey]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error loading saved movies.</p>;
  }

  return (
    <div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
        {movies.map((movie) => (
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
