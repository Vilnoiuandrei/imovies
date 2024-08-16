"use client";

import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex justify-center items-center">
      <input
        className="rounded-lg h-8"
        placeholder=" 🔎 Search.."
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
