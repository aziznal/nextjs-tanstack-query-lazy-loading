import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "@/components/providers";

const font = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Lazy loading (infinite scroll)",
  description: "Lazy loading (infinite scroll) with React Query and Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark">
      <body className={cn(font.className, "min-h-full sm:h-full")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
