import Image from "next/image";
import { useState } from "react";

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
export default function Movie({ movie }: MovieInterface) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      key={movie.id}
      className="bg-gray-900 gird rounded-lg border-black cursor-pointer border-4  overflow-hidden"
      onClick={handleToggle}
    >
      <h3 className="text-3xl text-center py-1">{movie.title}</h3>
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={500}
        height={0}
        placeholder="blur"
        blurDataURL={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
      />
      <p className="pl-2">Release: {formatDate(movie.release_date)}</p>
      <p className="pl-2"> Rating: {trimRating(movie.vote_average)}</p>
      {isExpanded && (
        <div className="p-4 bg-gray-900 rounded-b-lg">
          <p className="text-lg text-white">{movie.overview}</p>
        </div>
      )}
    </li>
  );
}
