"use client";
import { useQuery } from "@tanstack/react-query";
import Loader from "./../_components/Loader";
import MoviesList from "./../_components/MoviesList";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Link from "next/link";

const fetchSavedMovies = async () => {
  const res = await fetch("/api/user/");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
export default function Movies() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();
  }, []);
  const { data, isPending, error } = useQuery({
    queryKey: ["savedMovies"],
    queryFn: () => fetchSavedMovies(),
    enabled: true,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-80 flex-col gap-8">
        <p>You need to log in to view your saved movies.</p>
        <Link
          href="/account"
          className="bg-white text-black w-24 flex justify-center items-center rounded-md h-10"
        >
          <p>Log in</p>
        </Link>
      </div>
    );
  }

  if (isPending)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );

  if (error) return <p>Error loading your saved movies.</p>;

  if (!data?.movies || data.movies.length === 0) {
    return (
      <div className="flex justify-center items-center h-52">
        <p>You have no saved movies</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My List</h1>
      <MoviesList movies={data.movies} />
    </div>
  );
}
