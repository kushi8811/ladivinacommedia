"use client";
import { Montserrat } from "next/font/google";
import { useState } from "react";

const mono = Montserrat({
  subsets: ["latin"],
  display: "block",
  weight: "400",
});
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, phone, email, message };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus("Your message has been sent!");
      setName("");
      setEmail("");
      setMessage("");
      setPhone("");
    } else {
      setStatus("Error sending message. Please try again later.");
    }
  };

  return (
    <div className="relative w-[90%] sm:w-[95%] ml-8 h-[105vh] rounded-2xl max-w-lg mx-auto border border-primary-50 p-6 bg-white shadow-lg mt-[75px] pt-10 mb-4 pb-6">
      <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4 items-center">
        Contact Us
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full border border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black">
            E-mail Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-black">
            Message Content
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full border border-black rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows="2"
          ></textarea>
        </div>

        <div className="flex justify-center mt-4 sm:mt-2">
          <button
            type="submit"
            className="px-6 py-2 border border-primary-50 text-primary-50 font-bold uppercase text-xs tracking-wider bg-white hover:bg-primary-50 hover:text-white transition"
          >
            Send
          </button>
        </div>
      </form>

      {status && <p className="text-center mt-1 text-gray-700">{status}</p>}
    </div>
  );
}
