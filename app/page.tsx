import Search from "./_components/Search";

export default function Home() {
  return (
    <div className="flex w-screen justify-around mt-4">
      <h1 className="bg-yellow-500 text-black text-3xl px-2 py-2 rounded-sm">
        IMovies
      </h1>
      <Search />
    </div>
  );
}
