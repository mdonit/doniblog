"use client";

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Navigation from "@/components/Navigation";
import FooterContent from "@/components/FooterContent";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
// import bgImage from "../../public/background.png";
// import bgImage from "@/public/background.svg";

// const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Donát Maráki | Home",
  description: "Official Website of Donát Maráki",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
      // style={{
      //   backgroundImage: `url(${bgImage.src})`,
      //   width: "100%",
      //   height: "100vh",
      // }}
      >
        <AuthContextProvider>
          <header>
            <Navigation />
          </header>
          <main>{children}</main>

          <footer>
            <FooterContent />
          </footer>
        </AuthContextProvider>
      </body>
    </html>
  );
}
