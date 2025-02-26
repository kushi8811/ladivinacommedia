import { Vincenza } from "next/font/google";
import Logo from "./Logo";
import Navigation from "./Navigation";

// const vincenza = Vincenza({
// subsets: ["latin"],
// weight: ["400", "700"],
// });

export default function Header() {
  return (
    <div className="bg-primary-50">
      <Logo />
      <Navigation />
    </div>
  );
}
