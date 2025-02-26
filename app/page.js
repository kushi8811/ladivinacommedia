import Image from "next/image";
import HeroSection from "./_components/HeroSections";
import MenuContainer from "./_components/MenuContainer";
import Dante from "./_components/Dante";
import Gallery from "./_components/Gallery";
import Reservations from "./_components/Reservations";
import Footer from "./_components/Footer";
import ContactForm from "./_components/Contact";

export default function Home() {
  return (
    <main className="bg-black">
      <HeroSection />
      <MenuContainer />
      <Dante />
      <Gallery />
      <Reservations />
      <ContactForm />
      <Footer />
    </main>
  );
}
