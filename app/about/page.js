"use client";
import Image from "next/image";
import Link from "next/link";
import interno from "@/public/images/interno1.jpg";
import interno1 from "@/public/images/interno8.jpg";
import internodish from "@/public/images/8.jpg";

import interno2 from "@/public/images/interno7.jpg";
import interno3 from "@/public/images/interno2.jpg";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import Footer from "../_components/Footer";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

const taglienteFont = localFont({
  src: "./../../public/fonts/Tagliente.ttf",
  display: "block",
  weight: "900",
});
export default function About() {
  return (
    <>
      <div
        className={`${mono.className} min-h-screen bg-[#f8f5f2] text-[#3d2c2a] px-6 py-10 md:px-16`}
      >
        {/* Hero Section */}
        <div className="relative w-full h-[60vh] md:h-[80vh] rounded-lg overflow-hidden">
          <Image
            src={interno}
            alt="La Divina Commedia Interior"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
            <h1
              className={`${taglienteFont.className} text-3xl md:text-5xl font-semibold text-white`}
            >
              Welcome to La Divina Commedia
            </h1>
            <p className="mt-2 text-lg md:text-xl text-white max-w-xl">
              Where fine dining meets the poetry of flavors.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-10 md:mt-16 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl text-center text-black md:text-3xl font-semibold mb-1">
              Our Story
            </h2>
            <div className="w-32 h-[1px] bg-black mt-0  mx-auto transition-all duration-300 hover:w-40" />
            <p className="text-lg text-black leading-relaxed mt-4">
              Inspired by Dante Alighieri’s timeless journey, La Divina Commedia
              is more than a restaurant – it’s an experience. A place where
              flavors tell stories, and every dish is a chapter of Italian
              tradition.
            </p>
            <p className="mt-4 text-lg text-black leading-relaxed">
              We blend classic recipes with modern creativity, offering a dining
              experience that feels both elegant and inviting.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src={interno1}
              alt="Our Story"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image
              src={internodish}
              alt="Dining"
              width={250}
              height={150}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">Heavenly Flavors</h3>
            <div className="w-32 h-[1px] bg-black mt-0  mx-auto transition-all duration-300 hover:w-40" />
            <p className="text-black mt-2">
              Gourmet dishes crafted with passion and precision.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image
              src={interno3}
              alt="Atmosphere"
              width={250}
              height={150}
              className="rounded-lg mx-auto"
            />
            <h3 className="text-xl font-semibold mt-4">
              The Divine Atmosphere
            </h3>
            <div className="w-32 h-[1px] bg-black mt-0  mx-auto transition-all duration-300 hover:w-40" />
            <p className="text-black mt-2">
              A cozy, elegant setting inspired by Italian heritage.
            </p>
          </div>
        </div>

        {/* Visit Us Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold">Visit Us</h2>
          <p className="text-lg text-black mt-2">
            Experience the poetry of Italian cuisine in person.
          </p>
          <div className="mt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.1131465788653!2d11.253950540603366!3d43.77051007121705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a540117df5ef5%3A0xc264da3700b3e99a!2sRistorante%20La%20Divina%20Commedia!5e0!3m2!1sen!2sit!4v1739614568010!5m2!1sen!2sit"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg shadow-md"
            ></iframe>
          </div>
          <Link href="/contact">
            <button className="mt-6 bg-primary-50 text-white px-6 py-4  text-lg  transition">
              Get in Touch
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
