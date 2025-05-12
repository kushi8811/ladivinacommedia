import { Josefin_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import CookieBanner from "./_components/CookieBanner";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "block",
});

export const metadata = {
  title: {
    template: "%s : La Divina Commedia",
    default: "La Divina Commedia",
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" />
      <body className={`${josefin.className} overflow-x-hidden`}>
        <Header />
        <main className="relative bg-black">{children}</main>
        <CookieBanner />
      </body>
    </html>
  );
}
