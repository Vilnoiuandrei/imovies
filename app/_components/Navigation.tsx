import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-center text-2xl border-b-4 border-yellow-500 mb-2">
      <h1 className="bg-yellow-500 text-black text-3xl px-2 py-2 rounded-sm">
        IMovies
      </h1>
      <ul className=" w-screen flex justify-around pt-2">
        <li>
          <Link href="myList">My List</Link>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link
            href="account
          "
          >
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
