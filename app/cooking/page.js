"use client";
import { Josefin_Sans } from "next/font/google";
import { useState } from "react";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import image2 from "@/public/images/FOT_4.jpg";
import image3 from "@/public/images/FOT_8.jpg";
import image4 from "@/public/images/FOT_11.jpg";
import image5 from "@/public/images/FOT_2.jpg";
import logo from "@/public/images/cookingLogo.png";

const mono1 = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});

const mono = Josefin_Sans({
  subsets: ["latin"],
  display: "block",
});

const CookingClassPage = () => {
  const [showBooking, setShowBooking] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: 1,
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isSunday = (date) => {
    if (!date) return false;
    return new Date(date).getDay() === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSunday(form.date)) {
      setMessage("Sundays are not available.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("/api/cooking-class", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong.");
        return;
      }

      setMessage("Booking confirmed successfully!");
      setForm({
        name: "",
        email: "",
        guests: 1,
        date: "",
      });
    } catch (err) {
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-8 lg:px-16 space-y-24">
      {/* Header */}
      <motion.div
        {...fadeUp}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        <h3 className={`${mono.className} text-4xl sm:text-5xl font-thin`}>
          Cooking in Paradiso
        </h3>

        <h3 className="text-gray-400 font-thin tracking-wide">
          By Divina Commedia
        </h3>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center py-6"
        >
          <Image
            src={logo}
            alt="Cooking Class Logo"
            width={250}
            height={160}
            className="object-contain opacity-90 hover:opacity-100 transition duration-500"
            priority
          />
        </motion.div>

        <div className="w-32 h-[1px] bg-white mx-auto" />

        <p className="text-lg sm:text-xl leading-relaxed text-zinc-300">
          Learn how to make authentic handmade pasta while enjoying unlimited
          Chianti wine, just steps from Signoria Square and the Duomo.
        </p>

        <div className="flex justify-center pt-6">
          <Link
            href="#booking-section"
            className="group flex items-center gap-3 text-sm uppercase tracking-widest"
          >
            Book Now ↓
          </Link>
        </div>
      </motion.div>

      {/* Section 1 */}
      <motion.div
        {...fadeUp}
        className="grid sm:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
      >
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={image2}
            alt="Fresh pasta making"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-5">
          <h2 className={`${mono.className} text-3xl font-semibold`}>
            Make Pasta From Scratch
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Learn to prepare dough from scratch and shape classic pasta formats
            paired with traditional sauces.
          </p>
        </div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        {...fadeUp}
        className="grid sm:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
      >
        <div className="space-y-5 order-2 sm:order-1">
          <h2 className={`${mono.className} text-3xl font-semibold`}>
            Chianti Wine Experience
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            Enjoy unlimited Chianti wine tasting while you cook.
          </p>
        </div>
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl order-1 sm:order-2">
          <Image
            src={image3}
            alt="Chianti wine tasting"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Details */}
      <motion.div
        {...fadeUp}
        className="grid sm:grid-cols-2 gap-10 items-center max-w-6xl mx-auto"
      >
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={image4}
            alt="Cooking class session"
            fill
            className="object-cover"
          />
        </div>
        <h2
          className={`${mono.className} text-3xl font-semibold text-center mb-6`}
        >
          Class Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-white text-left">
            <thead>
              <tr className="bg-zinc-700/80">
                <th className="px-6 py-3 border border-white">Start Time</th>
                <th className="px-6 py-3 border border-white">Duration</th>
                <th className="px-6 py-3 border border-white">Max Seats</th>
                <th className="px-6 py-3 border border-white">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-zinc-700/50 transition">
                <td className="px-6 py-4 border border-white">12:00</td>
                <td className="px-6 py-4 border border-white">2h 30m</td>
                <td className="px-6 py-4 border border-white">8</td>
                <td className="px-6 py-4 border border-white">€60</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Highlight */}
      <motion.div
        {...fadeUp}
        className="relative h-96 max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl"
      >
        <Image
          src={image5}
          alt="Authentic Tuscan cooking"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-4xl font-bold text-white text-center px-6">
            Taste the Real Tuscany
          </h2>
        </div>
      </motion.div>

      {/* Booking Button */}
      <div className="text-center">
        <button
          id="booking-section"
          onClick={() => setShowBooking(!showBooking)}
          className="px-10 py-4 border-2 border-white uppercase text-sm tracking-widest font-semibold hover:bg-white hover:text-black transition"
        >
          {showBooking ? "Hide Booking Form" : "Book This Class"}
        </button>
      </div>

      {/* Booking Form */}
      {showBooking && (
        <motion.div
          {...fadeUp}
          className="bg-zinc-800 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto space-y-6"
        >
          <h3
            className={`${mono.className} text-2xl font-semibold text-center`}
          >
            Reserve Your Spot
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-zinc-700 text-white"
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full p-3 rounded-lg bg-zinc-700 text-white"
            />

            <input
              type="number"
              min={1}
              max={8}
              value={form.guests}
              onChange={(e) =>
                setForm({ ...form, guests: Number(e.target.value) })
              }
              required
              className="w-full p-3 rounded-lg bg-zinc-700 text-white"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full p-3 rounded-lg bg-zinc-700 text-white"
            />

            {isSunday(form.date) && (
              <p className="text-red-500 text-sm">Sundays are not available.</p>
            )}

            {message && (
              <p
                className={`text-sm ${message.includes("confirmed") ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || isSunday(form.date)}
              className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default CookingClassPage;
