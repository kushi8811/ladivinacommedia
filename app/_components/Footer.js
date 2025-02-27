"use client";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPhone,
  FaMailBulk,
  FaMailchimp,
} from "react-icons/fa";
import Link from "next/link";
import localFont from "next/font/local";
import Image from "next/image";
import logoimg from "@/public/images/logo.png";

const taglienteFont = localFont({
  src: "./../../public/fonts/Tagliente.ttf",
  display: "block",
  weight: "900",
});
const Footer = () => {
  return (
    <footer className="bg-primary-50 text-gray-300 py-10 mt-0 ">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center space-y-6">
        {/* Logo / Brand Name */}
        <h1
          className={`${taglienteFont.className} text-5xl font-semibold tracking-wide text-white`}
        >
          La Divina Commedia
        </h1>
        <Image src={logoimg} alt="Logo" className="h-[25vh]  w-auto pt-0.5" />
        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm uppercase tracking-wider">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/menu" className="hover:text-white transition">
            Menu
          </Link>
          <Link href="/booking" className="hover:text-white transition">
            Reservations
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex space-x-6 text-lg">
          <Link
            href="https://www.instagram.com/ladivinacommediafirenze/#"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.facebook.com/tavernadivinacommedia/?locale=it_IT"
            className="hover:text-white transition"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="tel:+390559067366"
            className="hover:text-white transition"
          >
            <FaPhone />
          </Link>
          <Link
            href="email:info@ristoanteladivina.com"
            className="hover:text-white transition"
          >
            <FaMailBulk />
          </Link>
        </div>

        {/* Copyright Notice */}
        <p className="text-xs text-gray-500">
          © 2025. La Divina Commedia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
