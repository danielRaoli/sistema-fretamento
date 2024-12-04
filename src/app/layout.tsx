import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

const raleway = Raleway({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Infoservice Fretamento",
  description: "Sistema de fretamento e transporte de passageiros",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${raleway.className} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
