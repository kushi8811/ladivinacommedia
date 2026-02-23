"use client";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import image from "@/public/images/FOT_7.jpg";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

const CookingClass = () => {
  return (
    <div className="relative flex items-center justify-center bg-black py-16 sm:py-24">
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-[90%] sm:w-[95%] md:w-[80%] lg:w-[70%]
                   max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl
                   h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Background Image */}
        <Image
          src={image} // ← Put your image inside /public folder
          alt="Cooking class pasta making"
          fill
          priority
          className="object-cover"
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white p-6 sm:p-8">
          <div className="max-w-2xl">
            <h3 className="text-lg tracking-wide">Cooking in Paradiso</h3>
            <h3 className="text-sm opacity-80">By La Divina Commedia</h3>
            <div className="w-44 h-[1px] bg-white mt-4 mb-80 mx-auto" />
            <p
              className={`${mono.className} text-sm sm:text-base md:text-lg font-light tracking-wide leading-relaxed`}
            >
              “Pasta class in the heart of city centre of Florence”
            </p>

            <Link href="/cooking">
              <button
                className="mt-10 px-8 py-3 border-2 border-white
                           uppercase text-xs tracking-widest font-semibold
                           hover:bg-white hover:text-black
                           transition-all duration-300"
              >
                Join the Cooking Class
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CookingClass;
