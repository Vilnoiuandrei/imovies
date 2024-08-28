"use client";

import { signOut } from "next-auth/react";
export default function SignOut() {
  return (
    <button
      className="bg-customLight text-customDark  h-10 w-36 mt-4 shadow-md rounded-md mr-4 bg-white text-black"
      onClick={() => signOut()}
    >
      Sign Out
    </button>
  );
}
