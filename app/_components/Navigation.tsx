"use client";

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaHome, FaRegBookmark, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Search from "./Search";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(false);
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
      <nav className="flex justify-around items-center border-b-4 border-yellow-500 mb-2 h-14">
        <FaBars
          onClick={togglePopup}
          className="cursor-pointer  w-12  h-10 ml-4"
        />
        <div className="bg-yellow-500 rounded-sm h-10  flex justify-center items-center">
          <h1 className=" text-black text-3xl px-1  ">ITMB</h1>
        </div>

        <Search />
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
        className={`fixed top-0 left-0 w-1/2 md:w-1/3 h-screen bg-black z-50 transform transition-transform duration-300 ${
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
              <Link href="/" className="flex items-center space-x-2 w-36 mt-8">
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link href="/myList" className="flex items-center space-x-2 w-36">
                <FaRegBookmark />
                <span>My List</span>
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="flex items-center space-x-2 w-36"
              >
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
