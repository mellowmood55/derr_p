import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { DERRICK_DATA, LINKEDIN_URL } from "@/data/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Derrick Adang | Portfolio",
  description: "Data Science, CRM, and leadership portfolio for Derrick Adang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-neutral-950 text-zinc-100">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-yellow-500/20 bg-black/90">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <p>Derrick Adang • Nairobi County, Kenya</p>
              <p className="text-zinc-400">{DERRICK_DATA.contact.email}</p>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-yellow-400 transition hover:text-yellow-300"
            >
              Connect on LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
