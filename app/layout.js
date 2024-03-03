import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma Phi Delta PSA Chapter Attendance",
  description:
    "Please attend our lovely chapters, or any event we require you to be at!",
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
