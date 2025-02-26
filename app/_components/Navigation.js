"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Montserrat } from "next/font/google";

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

  // Close menu when clicking outside
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
      {/* Toggle Button (☰ / X) */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="absolute top-8 left-4 z-[200] bg-transparent text-accent-500 text-xl"
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar Menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 h-full bg-primary-50 text-white w-4/5 transform transition-transform duration-500 z-[100] 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
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
      </div>
    </>
  );
}

export default Navigation;
