import Image from "next/image";
import dante from "@/public/images/dante.png";
// import { Space_Mono } from "next/font/google";
import localFont from "next/font/local";

const fioreFont = localFont({
  src: "/fonts/fiore.ttf",
  display: "block",
  weight: "400",
});

function Dante() {
  return (
    <section className="text-center py-12">
      {/* Dante Logo */}
      <div className="flex justify-center items-center mb-6">
        <Image
          src={dante}
          alt="Dante Logo"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <p
        className={`${fioreFont.className} text-lg sm:text-xl md:text-2xl font-serif text-accent-500 leading-relaxed px-6 sm:px-12`}
      >
        In the darkest places, we find our path to enlightenment. Join us in a
        journey of taste and soul. Come, embark on this experience, where every
        bite is poetry in motion.
      </p>
      <button className="mt-4 sm:mt-6 px-6 py-2 border border-black uppercase text-xs tracking-wider bg-primary-50 text-white hover:bg-white hover:text-black transition duration-200">
        Discover more
      </button>
    </section>
  );
}

export default Dante;
