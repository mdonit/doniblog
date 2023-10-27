import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donát Maráki | Q&A",
  description: "Questions to Donát Maráki with answers",
};

export default function QnaLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div>Q&A Layout</div>
      {children}
    </section>
  );
}
