import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

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

const fetchLikedMovies = async (movieId: number | string) => {
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

export default function LikeMovies({ movie }: MovieInterface) {
  const movieId = movie.id;
  const { refetch: refetch1 } = useQuery({
    queryKey: ["movieSaved"],
    queryFn: () => fetchLikedMovies(movieId),
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const { refetch: refetch2 } = useQuery({
    queryKey: ["movieSaved"],
    queryFn: () => fetchRemovedLikedMovies(movieId),
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const [like, setLike] = useState(false);

  function handleLiked(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    e.preventDefault();
    if (!like) {
      refetch1();
    } else {
      refetch2();
    }
    setLike((c) => !c);
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
