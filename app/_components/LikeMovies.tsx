"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeMoviesProps {
  movie: {
    id: number;
  };
}

interface LikedMoviesApiResponse {
  movies: number[];
}

const fetchLikedMovies = async (): Promise<LikedMoviesApiResponse> => {
  const res = await fetch("/api/userMovies");

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};

const fetchAddLikedMovies = async (movieId: number | string): Promise<void> => {
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

const fetchRemovedLikedMovies = async (
  movieId: number | string
): Promise<void> => {
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

function checkLikedMovies(userMoviesId: number[], movieId: number): boolean {
  return userMoviesId.some((userMovieId) => userMovieId === movieId);
}

export default function LikeMovies({ movie }: LikeMoviesProps) {
  const movieId = movie.id;

  const { data: likedMoviesData, refetch: refetchLikedMovies } =
    useQuery<LikedMoviesApiResponse>({
      queryKey: ["savedMovies"],
      queryFn: fetchLikedMovies,
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

  const [like, setLike] = useState(false);

  const addLikeMutation = useMutation({
    mutationFn: fetchAddLikedMovies,
    onSuccess: () => {
      refetchLikedMovies();
      setLike(true);
    },
  });

  const removeLikeMutation = useMutation({
    mutationFn: fetchRemovedLikedMovies,
    onSuccess: () => {
      refetchLikedMovies();
      setLike(false);
    },
  });

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
      removeLikeMutation.mutate(movieId);
    } else {
      addLikeMutation.mutate(movieId);
    }
  }

  return (
    <div
      className="absolute bottom-2 right-2 mb-1 mr-2 flex text-4xl text-red-800"
      onClick={handleLiked}
    >
      {like ? <FaHeart /> : <FaRegHeart />}
    </div>
  );
}
