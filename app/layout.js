
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Provider from './Provider'
import { Analytics } from '@vercel/analytics/react'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextHire - AI Interview Platform",
  description: "AI-powered interview screening platform to hire the best candidates",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
