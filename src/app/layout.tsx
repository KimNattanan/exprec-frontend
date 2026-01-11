
import type { Metadata } from "next";
import { Geist, Geist_Mono, Fredoka } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Exprec",
  description: "Expense tracking tool online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${fredoka.variable} antialiased transition-colors duration-500`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
