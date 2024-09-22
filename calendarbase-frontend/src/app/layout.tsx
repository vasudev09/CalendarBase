import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CalendarBase",
  description: "Schedule Events and Manage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
