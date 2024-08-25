import Movie from "./Movie";

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
interface MovieApiResponse {
  movies: Movie[];
}

export default function MoviesList({ movies }: MovieApiResponse) {
  return (
    <div>
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
        {movies?.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
