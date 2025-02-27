"use client";
import Image from "next/image";
import reservationBg from "@/public/images/logoBooking.png";
import { Montserrat } from "next/font/google";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "500",
});

const ReservationsContainer = () => {
  return (
    <div className="relative w-[90%] sm:w-[95%] ml-8 h-[75vh] rounded-2xl flex items-center justify-center bg-primary-50 py-16 sm:py-24">
      {/* Static Container (EXACT same size as MenuContainer) */}
      <div
        className="relative w-[90%] sm:w-[95%] md:w-[80%] lg:w-[70%] 
                   max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl 
                   h-[110vh] sm:h-[95vh] md:h-[100vh] flex flex-col items-center justify-center 
                   overflow-hidden shadow-lg"
      >
        {/* Smaller Background Logo */}
        <Image
          src={reservationBg}
          alt="Reservation Background"
          width={200} // Adjusted size
          height={200} // Adjusted size
          className="object-contain absolute top-4 sm:top-4 md:top-8 z-8"
          priority
        />

        {/* Text & Button on Top */}
        <div className="relative text-center text-white p-10 sm:p-8 max-w-lg mt-28 sm:mt-32 md:mt-40">
          <h2
            className={`${mono.className} text-2xl mt-[45px] font-semibold pb-2`}
          >
            Reservations
          </h2>
          <div className="w-32 h-[1px] bg-white mb-4  mx-auto transition-all duration-300 hover:w-40" />
          <h2 className={`${mono.className} text-2xl font-semibold`}>
            Endless Encounters,
          </h2>
          <span className={`${mono.className} text-2xl font-semibold`}>
            Unforgettable Gatherings
          </span>
          <p
            className={`${mono.className} text-gray-300 text-sm sm:text-lg mt-2 opacity-80`}
          >
            “Great conversations and unforgettable moments start with a seat at
            the right table. Book now and make tonight one to remember.”
          </p>

          <button
            className="mt-4 sm:mt-6 px-6 py-2 border-2 text-primary-50  font-bold border-primary-50  
                             uppercase text-xs tracking-wider bg-white hover:text-primary-50 
                             transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationsContainer;
