import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "映画部 アンケート",
  description: "映画部で次に上映する作品を投票する",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <Head>
        <meta property="og:title" content="映画部 アンケート" />
        <meta property="og:description" content="映画部で次に上映する作品を投票する" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://main.d27y2h250yphml.amplifyapp.com/" />
        <meta property="og:image" content="/title.webp" />
        <meta property="og:site_name" content="映画部" />
        <meta property="og:locale" content="ja_JP" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
