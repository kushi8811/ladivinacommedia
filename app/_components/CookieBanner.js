"use client";
import React from "react";
import CookieConsent from "react-cookie-consent";

export default function CookieBanner() {
  return (
    <div>
      <CookieConsent
        location="bottom"
        buttonText="Accept! 🍪 "
        cookieName="yourCookieName"
        style={{
          background: "#F8F8F8", // Light background
          color: "#333", // Dark text color for good contrast
          fontSize: "15px", // Slightly smaller font size
          padding: "12px 25px", // Less padding for a more compact banner
          position: "fixed",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: "9999",
          textAlign: "center", // Center the content
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)", // Slight shadow for depth
        }}
        buttonStyle={{
          background: "#FF6F61", // Soft coral color for button
          color: "#fff",
          fontSize: "14px",
          padding: "10px 20px",
          borderRadius: "20px", // Rounder button edges
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease", // Smooth hover effect
        }}
        expires={150}
      >
        We use cookies to enhance your experience on our website. By clicking
        &quot;Accept&quot;, you agree to our cookie policy.
      </CookieConsent>

      <style jsx>{`
        /* Media Queries for Small Screens */
        @media (max-width: 600px) {
          .cookieConsent {
            font-size: 13px !important;
            padding: 10px 18px !important;
          }

          .cookieConsent button {
            font-size: 13px !important;
            padding: 8px 18px !important;
          }
        }

        @media (max-width: 400px) {
          .cookieConsent {
            font-size: 12px !important;
            padding: 8px 15px !important;
          }

          .cookieConsent button {
            font-size: 12px !important;
            padding: 7px 15px !important;
          }
        }
      `}</style>
    </div>
  );
}
