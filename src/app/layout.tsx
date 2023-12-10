import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import FooterContent from "@/components/FooterContent";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Donát Maráki | Home",
  description: "Official Website of Donát Maráki",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
