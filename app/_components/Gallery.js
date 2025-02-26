"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "@/public/images/1.jpg";
import img2 from "@/public/images/2.jpg";
import img3 from "@/public/images/3.jpg";
import img4 from "@/public/images/4.jpg";
import img5 from "@/public/images/5.jpg";
import img6 from "@/public/images/6.jpg";
import img7 from "@/public/images/7.jpg";
import img8 from "@/public/images/8.jpg";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

const images = [img1, img2, img3, img4, img5, img6, img7, img8];

const Gallery = () => {
  return (
    <div className="relative w-full flex flex-col items-center bg-black py-14 sm:py-20 overflow-hidden">
      {/* Text Above Carousel */}
      <div className="text-center mb-8 sm:mb-12">
        <h2
          className={`${mono.className} text-white text-4xl sm:text-5xl font-bold uppercase tracking-wider`}
        >
          Gallery
        </h2>
        <Link
          href="/gallery"
          className={`${mono.className} font-extralight text-white text-sm sm:text-lg mt-4 uppercase`}
        >
          Get to know us
          <div className="w-32 h-[1px] bg-white mt-1  mx-auto transition-all duration-300 hover:w-40" />
        </Link>
      </div>

      {/* Carousel Container */}
      <motion.div
        className="flex w-[200%] md:w-[180%] lg:w-[160%] xl:w-[140%] 
                   max-w-5xl h-[55vh] sm:h-[70vh] md:h-[80vh] lg:h-[85vh] rounded-2xl shadow-lg"
        animate={{ x: ["0%", "-200%"] }}
        transition={{
          ease: "linear",
          duration: 30,
          repeat: Infinity,
        }}
      >
        {/* Duplicate images for smooth infinite scroll */}
        {[...images, ...images].map((img, index) => (
          <div key={index} className="relative  w-1/4 flex-shrink-0 mr-[4px]">
            <Image
              src={img}
              alt={`Gallery Image ${index + 1}`}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
