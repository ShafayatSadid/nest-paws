import { Nunito, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Nest Paws | Find Your Furry Friend Today",
  description: "Adopt dogs, cats, birds, rabbits, and more. Give an abandoned animal a loving home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased bg-background text-foreground">
        <Providers>
          <NavBar />
          {children}
          <Toaster position="top-center" />
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}