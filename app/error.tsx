"use client";
import Link from "next/link";
import React from "react";

export default function ErrorPage() {
  return (
    <div>
      <h1>Something went wrong</h1>
      <p>We are sorry, but an error occurred. Please try again later.</p>
      <Link href="/">Go back to the home page</Link>
    </div>
  );
}
