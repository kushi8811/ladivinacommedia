// gallery/GalleryCarousel.js
"use client";
import React, { useState } from "react";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";

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

const GalleryCarousel = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={`${taglienteFont.className} my-8`}>
      <h2 className="text-5xl font-semibold text-white text-center mb-6">
        {title}
      </h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {images.map((img, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-80 h-60 transition-transform duration-500 ease-in-out ${
                index === currentIndex ? "scale-105" : "scale-95"
              }`}
            >
              <img
                src={img}
                alt={`Image ${index + 1}`}
                className="object-cover w-full h-full rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        {/* Previous and Next buttons */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        >
          &#10094;
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default GalleryCarousel;
