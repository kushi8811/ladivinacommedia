"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import logo from "@/public/images/logo.png";
import logo2 from "@/public/images/cookingLogo.png";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="absolute top-8 left-4 z-[200] bg-transparent text-accent-500 text-xl"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full bg-primary-50 text-white w-4/5 transform transition-transform duration-500 z-[100] 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Navigation Links */}
        <ul className="flex flex-col items-center space-y-6 mt-24">
          <li>
            <Link
              href="/"
              className={`${mono.className} text-2xl text-accent-500`}
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`${mono.className} text-2xl text-accent-500`}
              onClick={toggleMenu}
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              href="/menu.pdf"
              className={`${mono.className} text-2xl text-accent-500`}
              onClick={toggleMenu}
            >
              Menu
            </Link>
          </li>
          <li>
            <Link
              href="/winemenu.pdf"
              className={`${mono.className} text-2xl text-accent-500`}
              onClick={toggleMenu}
            >
              Wine Menu
            </Link>
          </li>

          <li>
            <Link
              href="/gallery"
              className={`${mono.className} text-2xl text-accent-500`}
              onClick={toggleMenu}
            >
              Gallery
            </Link>
          </li>
          <li>
            <Link
              href="/booking"
              className={`${mono.className} text-2xl text-accent-500`}
              onClick={toggleMenu}
            >
              Book a table
            </Link>
          </li>
        </ul>

        {/* Bottom Logo Section */}
        <div className="absolute bottom-10 left-0 w-full flex items-center justify-center gap-6">
          <Image
            src={logo}
            alt="Main Logo"
            width={200}
            height={200}
            className="object-contain opacity-80 hover:opacity-100 transition duration-300"
          />

          <div className="h-20 w-[1px] bg-accent-500"></div>

          <Image
            src={logo2}
            alt="Cooking Logo"
            width={200}
            height={200}
            className="object-contain opacity-80 hover:opacity-100 transition duration-300"
          />
        </div>
      </div>
    </>
  );
}

export default Navigation;
