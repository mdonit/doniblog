import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donát Maráki | Q&A",
  description: "Questions to Donát Maráki",
};

export default function QnaLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1 className="page-title">Q&A</h1>
      {children}
    </section>
  );
}
