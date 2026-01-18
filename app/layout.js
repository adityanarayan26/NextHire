
import localFont from "next/font/local";
import "./globals.css";
import Provider from './Provider'
import { Analytics } from '@vercel/analytics/react'

const montreal = localFont({
  src: './ppneuemontreal-medium.1d9802bc.woff',
  variable: '--font-montreal',
  weight: '500',
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
        className={`${montreal.variable} antialiased font-[family-name:var(--font-montreal)]`}
      >
        <Provider>
          {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
