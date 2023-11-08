import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donát Maráki | Blogs",
  description: "Blogs written by Donát Maráki",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <h1>Blog</h1>
      {children}
    </section>
  );
}
