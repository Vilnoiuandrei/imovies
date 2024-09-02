import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useQuery, useMutation } from "@tanstack/react-query";

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
interface MovieInterface {
  movie: Movie;
}

const fetchLikedMovies = async () => {
  const res = await fetch("/api/userMovies");

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

const fetchAddLikedMovies = async (movieId: number | string) => {
  const res = await fetch("/api/userMovies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

const fetchRemovedLikedMovies = async (movieId: number | string) => {
  const res = await fetch("/api/userMovies/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movieId }),
  });

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

function checkLikedMovies(
  userMoviesId: Array<number>,
  movieId: number
): boolean {
  return userMoviesId.some((userMovieId) => userMovieId === movieId);
}

export default function LikeMovies({ movie }: MovieInterface) {
  const movieId = movie.id;

  // Fetch liked movies
  const { data: likedMoviesData, refetch: refetchLikedMovies } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: () => fetchLikedMovies(),
    enabled: true,
  });

  // Mutation for adding a liked movie
  const { mutate: addLike } = useMutation({
    mutationFn: (movieId: number | string) => fetchAddLikedMovies(movieId),
    onSuccess: () => refetchLikedMovies(), // Refetch liked movies after adding
  });

  // Mutation for removing a liked movie
  const { mutate: removeLike } = useMutation({
    mutationFn: (movieId: number | string) => fetchRemovedLikedMovies(movieId),
    onSuccess: () => refetchLikedMovies(), // Refetch liked movies after removing
  });

  // Determine if the movie is liked
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    if (likedMoviesData) {
      const likedMovies = likedMoviesData.movies;
      setLike(checkLikedMovies(likedMovies, movieId));
    }
  }, [likedMoviesData, movieId]);

  function handleLiked(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();

    if (like) {
      removeLike(movieId);
    } else {
      addLike(movieId);
    }
    setLike((prev) => !prev);
  }

  return (
    <div
      className="absolute  bottom-2 right-2 mb-1 mr-2 flex text-4xl text-red-800 "
      onClick={handleLiked}
    >
      {like ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
}
