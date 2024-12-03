import Image from "next/image";
import { Head } from "next/document";
import Header from "@/main-pages/Header/Header";
import Body from "@/main-pages/Body/Body";
import Footer from "@/main-pages/Footer/Footer";
import Summaries from "@/main-pages/Summaries/Summaries";
import { Inter, Poppins } from "next/font/google";
import { useState,useEffect } from "react";

const poppins = Poppins({ subsets: ["latin"], weight:['400']});

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
      <Summaries />
      <Footer />
    </div>
  );
}
