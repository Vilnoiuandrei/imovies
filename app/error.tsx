"use client";
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-3">
        <p>We are sorry, but an error occurred. Please try again later.</p>
        <Link
          href="/"
          className="bg-white text-black p-3 text-center rounded-md"
        >
          Go back to the home page
        </Link>
      </div>
    </div>
  );
}
