import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donát Maráki | Portfolio",
  description: "Donát Maráki Portfolio",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1>Portfolio</h1>
      {children}
    </section>
  );
}
