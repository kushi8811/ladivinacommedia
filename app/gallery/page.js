// gallery/page.js
"use client";
import Footer from "../_components/Footer";
import GalleryCarousel from "./../_components/GalleryCarousel";

const InteriorImages = [
  "/images/interno1.jpg",
  "/images/interno3.jpg",
  "/images/interno2.jpg",
  "/images/interno7.jpg",
  "/images/interno5.jpg",
  "/images/interno6.jpg",
  // Add more interior images here
];

const FoodImages = [
  "/images/1.jpg",
  "/images/5.jpg",
  "/images/11.jpg",
  "/images/12.jpg",
  "/images/2.jpg",
  "/images/8.jpg",
  "/images/10.jpg",
  "/images/3.jpg",
  "/images/6.jpg",
  "/images/4.jpg",
  "/images/9.jpg",
  // Add more food images here
];

const GalleryPage = () => {
  return (
    <>
      <div className="px-4 md:px-12 py-8">
        <GalleryCarousel images={InteriorImages} title="Interior Gallery" />
        <GalleryCarousel images={FoodImages} title="Food Gallery" />
      </div>
      <Footer />
    </>
  );
};

export default GalleryPage;
