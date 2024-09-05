import { Inter } from "next/font/google";
import "./css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma Phi Delta Beer Olympics Attendance",
  description: "Beer Olympics rush event: 9/5/24.",
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
