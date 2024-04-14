import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma Phi Delta Crossing Ceremony Attendance",
  description: "Crossing Ceremony for Omega Class, 4/14/24.",
  icons: {
    icon: "/icon.ico",
  },
};

export default function RootLayout({ children }) {
  let test = "test";
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
