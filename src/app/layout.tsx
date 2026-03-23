import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ojas | Creative Developer & Designer",
  description: "I don't build websites, I build experiences. Full-stack developer & designer crafting immersive digital experiences with cutting-edge technology.",
  keywords: ["developer", "portfolio", "creative", "full-stack", "react", "nextjs", "three.js"],
  authors: [{ name: "Ojas" }],
  openGraph: {
    title: "Ojas | Creative Developer & Designer",
    description: "I don't build websites, I build experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased noise-overlay">
        {children}
      </body>
    </html>
  );
}
