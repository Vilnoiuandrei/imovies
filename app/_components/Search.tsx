"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// interface SearchProps {
//   query: string;
//   setQuery: (value: string | ((value: string) => string)) => void;
// }
async function fetchSearchMovies(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=e40eb02fb75cbc3619cc44a458eb02a4&query=${query}`
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
}

export default function Search() {
  const [query, setQuery] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchSearchMovies(query),
    enabled: false,
    refetchOnWindowFocus: false,
  });

  // useEffect to trigger the API call conditionally
  useEffect(() => {
    if (query.length >= 2) {
      refetch(); // This triggers the React Query API call
    }
  }, [query, refetch]);

  return (
    <input
      className="rounded-sm h-10 text-xl text-black w-40 md:w-80"
      placeholder=" Search.."
      id="search"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
//<FaSearch size={25}" />
