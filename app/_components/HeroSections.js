"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import img1 from "@/public/images/main.png";
import img2 from "@/public/images/interno1.jpg";
import img3 from "@/public/images/4.jpg";
import img4 from "@/public/images/interno4.jpg";

const taglienteFont = localFont({
  src: "./../../public/fonts/Tagliente.ttf",
  display: "block",
  weight: "900",
});

// Image and text data
const images = [
  { src: img1, text: "La Divina Commedia" },
  { src: img2, text: "Taste the Journey" },
  { src: img3, text: "Authentic Italian Cuisine" },
  { src: img4, text: "Cherish Every Moment" },
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Image change interval (5 seconds)
    const interval = setInterval(() => {
      setShowText(false); // Hide text at 4.5s
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length); // Change image
      }, 500); // Delay image change
    }, 5000); // Total cycle: 5s

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Show text after 0.5s when image changes
    const textTimeout = setTimeout(() => setShowText(true), 700);

    // Hide text at 4.5s, just before image change
    const hideTextTimeout = setTimeout(() => setShowText(false), 4000);

    return () => {
      clearTimeout(textTimeout);
      clearTimeout(hideTextTimeout);
    };
  }, [index]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Image Background */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        <Image
          src={images[index].src}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Text Overlay with Rounded Container */}
      <div className={`hero-container ${showText ? "hero-show" : "hero-hide"}`}>
        <div
          className={`hero-text-container ${
            showText ? "hero-show" : "hero-hide"
          }`}
        >
          <h1
            className={`${taglienteFont.className} text-accent-500 hero-text ${
              showText ? "hero-show" : "hero-hide"
            }`}
          >
            {images[index].text}
          </h1>
        </div>
      </div>
    </div>
  );
}
