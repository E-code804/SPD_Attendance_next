import { Inter } from "next/font/google";
import "./css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma Phi Delta Chapter Attendance",
  description:
    "Please attend our lovely chapters, or any event we require you to be at!.",
  icons: {
    icon: "/icons/icon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
