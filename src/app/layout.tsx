import type { Metadata } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "../styles/globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { LINKEDIN_URL } from "@/data/profile";
import { getContactContent } from "@/lib/content";

const manrope = Manrope({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Derrick Adang | Portfolio",
  description: "Data Science, CRM, and leadership portfolio for Derrick Adang",
  icons: {
    icon: "/brand-icon.svg",
    shortcut: "/brand-icon.svg",
    apple: "/brand-icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contact = await getContactContent();

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-neutral-950 text-zinc-100">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="animate-drift absolute left-[6%] top-16 h-72 w-72 rounded-full bg-sky-400/12 blur-3xl" />
          <div className="animate-drift absolute bottom-12 right-[8%] h-80 w-80 rounded-full bg-blue-500/10 blur-3xl [animation-delay:1.3s]" />
          <div className="animate-drift absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl [animation-delay:2.1s]" />
        </div>
        <Navbar />
        <main className="animate-rise mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          {children}
        </main>
        <footer className="border-t border-slate-300/15 bg-[#060912]/85 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-zinc-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <p className="text-zinc-100">Derrick Adang • Nairobi County, Kenya</p>
              <p className="text-zinc-400">{contact.email}</p>
            </div>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sky-300 transition hover:text-sky-200"
            >
              Connect on LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
