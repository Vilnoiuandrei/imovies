"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaHome, FaRegBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <nav className="flex justify-around border-b-4 border-yellow-500 mb-2">
        <FaBars
          onClick={togglePopup}
          className="cursor-pointer  w-12 pt-4 h-12"
        />

        <h1 className="bg-yellow-500 text-black text-3xl  my-2 px-2 py-2 rounded-sm h-12 w-32">
          IMovies
        </h1>
        <span className="py-4">🔎</span>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={togglePopup}
      ></div>

      {/* Slide-in menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 md:w-1/3 h-screen bg-black z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <IoClose
          onClick={togglePopup}
          size={30}
          color="white"
          className="cursor-pointer absolute top-4 right-4 text-black"
        />

        {/*  Navigation Menu */}
        <nav className="flex flex-col items-center text-2xl justify-center h-72">
          <ul className="w-full flex flex-col items-center space-y-4 pt-6 gap-12">
            <li>
              <Link href="/" className="flex items-center space-x-2">
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/myList" className="flex items-center space-x-2">
                <FaRegBookmark />
                <span>My List</span>
              </Link>
            </li>
            <li>
              <Link href="/account" className="flex items-center space-x-2">
                <CgProfile />
                <span>Account</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
