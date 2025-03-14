"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import menu1 from "@/public/images/menu.png";
import { Montserrat } from "next/font/google";
import Link from "next/link";
const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

const MenuContainer = () => {
  return (
    <div className="relative flex items-center justify-center bg-black py-16 sm:py-24">
      {/* Motion Container for Entrance Animation */}
      <motion.div
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-[90%] sm:w-[95%] md:w-[80%] lg:w-[70%] 
                   max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl 
                   h-[105vh] sm:h-[75vh] md:h-[100vh] flex items-center justify-center 
                   rounded-2xl overflow-hidden shadow-lg"
      >
        {/* Background Image */}
        <Image
          src={menu1}
          alt="Background"
          fill
          className="object-cover absolute inset-0 z-0 rounded-2xl"
          priority
        />

        {/* Text & Button on Top */}
        <div className="relative text-center text-white p-6 sm:p-8 max-w-lg">
          <p
            className={`${mono.className}text-sm sm:text-sm  font-light md:text-base lg:text-lg font-mono tracking-wide leading-relaxed`}
          >
            “Step into a world where flavors transcend the ordinary. A journey
            of taste, poetry, and passion awaits—where the earthly meets the
            divine.”
          </p>

          <Link href="/menu.pdf">
            <button
              className="mt-4 sm:mt-6 px-6 py-2 border-2 text-primary-50 font-bold border-primary-50  
                             uppercase text-xs tracking-wider hover:bg-white hover:text-primary-50 
                             transition"
            >
              Explore the Menu
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default MenuContainer;
