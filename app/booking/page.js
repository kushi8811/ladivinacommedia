"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Footer from "../_components/Footer";
import { Montserrat } from "next/font/google";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "500",
});

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const sendBookingEmail = async (bookingData) => {
  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...bookingData,
        isLargeBooking: bookingData.guests >= 6,
      }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    status: "pending",
    specialRequest: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [guestAlert, setGuestAlert] = useState("");

  const hangleGuestChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFormData({ ...formData, guests: value });

    if (value >= 6) {
      setGuestAlert("Guest more than 6 will need to await confirmation");
    } else {
      setGuestAlert("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsValid(true);

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time
    ) {
      setMessage("Please fill in all required fields.");
      setIsValid(false);
      setLoading(false);
      return;
    }

    // Email format validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      setMessage("Please enter a valid email address.");
      setIsValid(false);
      setLoading(false);
      return;
    }

    // Phone number validation (simple check)
    const phonePattern = /^[+]?[0-9]{10,13}$/;
    if (!phonePattern.test(formData.phone)) {
      setMessage("Please enter a valid phone number.");
      setIsValid(false);
      setLoading(false);
      return;
    }

    // Insert data into Supabase bookings table
    try {
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            date: formData.date,
            time: formData.time,
            guests: formData.guests,
            special_request: formData.specialRequest,
            status: formData.status,
            pending_confirmation: formData.guests >= 6, // Flag for confirmation if guests >= 6
          },
        ])
        .select("*")
        .single();

      if (error) {
        throw error;
      }

      // Send emails after successful booking
      await sendBookingEmail(data);

      setMessage("Booking successful! We will contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        specialRequest: "",
      });
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${mono.className} bg-white min-h-screen`}>
      <div className="border border-primary-50 rounded-md m-">
        <div className="max-w-lg mx-auto p-6 mt-1  bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Reserve a Table
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 123 456 7890"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-black font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-black font-medium mb-1">
                  Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <label className="block text-black font-medium mb-1">
                  Time
                </label>
                <input
                  type="time"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                  min={new Date().toTimeString().slice(0, 5)}
                />
              </div>
            </div>

            <div>
              <label className="block text-black font-medium mb-1">
                Guests
              </label>
              <input
                type="number"
                min="1"
                max="20"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.guests}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setFormData({
                    ...formData,
                    guests: value,
                  });

                  if (value >= 6) {
                    setGuestAlert(
                      "Guests more than 6 will need to await confirmation."
                    );
                  } else {
                    setGuestAlert("");
                  }
                }}
                required
              />
              {guestAlert && <p className="text-red-500 mt-2">{guestAlert}</p>}
            </div>

            <div>
              <label className="block text-black font-medium mb-1">
                Special Requests
              </label>
              <textarea
                placeholder="Any special requests..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.specialRequest}
                onChange={(e) =>
                  setFormData({ ...formData, specialRequest: e.target.value })
                }
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-50 text-white font-semibold p-3 rounded-lg hover:bg-accent-500 disabled:bg-gray-400 transition"
              disabled={loading || !isValid}
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </form>

          {message && <p className="mt-4 text-center text-black">{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;
