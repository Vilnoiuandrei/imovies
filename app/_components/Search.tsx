"use client";

interface SearchProps {
  query: string;
  setQuery: (value: string | ((value: string) => string)) => void;
}

export default function Search({ query, setQuery }: SearchProps) {
  return (
    <div className="flex justify-center items-center text-xl text-black">
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
