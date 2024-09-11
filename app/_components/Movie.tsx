"use client";
import Image from "next/image";
import { useState } from "react";
import LikeMovies from "./LikeMovies";

interface MovieProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
  };
  isAuthenticated: boolean;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
function trimRating(rating: number) {
  return parseFloat(rating.toFixed(1));
}

export default function Movie({ movie, isAuthenticated }: MovieProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      key={movie.id}
      className="bg-gray-900 gird rounded-lg border-black cursor-pointer border-4 overflow-hidden text-lg relative"
      onClick={handleToggle}
    >
      <h3 className="text-3xl text-center py-1">{movie.title}</h3>
      <Image
        className="mx-auto h-auto"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={0}
        placeholder="blur"
        blurDataURL={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
      />
      <p className="px-4 pt-2">Release: {formatDate(movie.release_date)}</p>
      <p className="px-4 pb-2"> Rating: {trimRating(movie.vote_average)}</p>
      {isAuthenticated && <LikeMovies movie={movie} />}
      {isExpanded && (
        <div className="p-4 bg-gray-900 rounded-b-lg">
          <p className="text-lg text-white">{movie.overview}</p>
        </div>
      )}
    </li>
  );
}
