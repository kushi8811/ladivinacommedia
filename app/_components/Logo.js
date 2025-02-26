import Image from "next/image";
import { Lora } from "next/font/google";
import logoimg from "@/public/images/logo.png";
// import logoname from "@/public/images/logoname.png";
import Link from "next/link";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Logo() {
  return (
    <div
      className={`${lora.className} flex flex-col justify-center items-center h-auto mb-0 pb-0 relative`} // Reduced margin and padding for a thinner header
    >
      <Image
        src={logoimg}
        alt="Logo"
        className="h-28 sm:h-16 md:h-18 lg:h-20 xl:h-24 w-auto pt-0.5" // Reduced padding-top for logo
      />

      {/* Button placed on the right */}
      <div className="mt-7 absolute top-2 right-4 bg-transparent items-center justify-center flex border-2 border-accent-500 shadow-lg hover:bg-accent-500 text-accent-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
        <button className="px-2 py-0 text-sm">
          <Link href="/booking">Book now</Link>
        </button>
      </div>
    </div>
  );
}

export default Logo;
