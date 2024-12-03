import Image from "next/image";
import { Head } from "next/document";
import Header from "@/main-pages/Header/Header";
import Data from "@/main-pages/Data/Data";
import Footer from "@/main-pages/Footer/Footer";
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  return (
    <div
      className={poppins.className}
      style={{
        width: "100svw",
        height: "100svh",
      }}
    >
      
      <Header />
      <Data />
      <Footer />
    </div>
  );
}
