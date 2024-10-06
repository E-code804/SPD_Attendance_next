import { Inter } from "next/font/google";
import "./css/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma Phi Delta Chapter Attendance",
  description: "Chapter: 10/06/24.",
  icons: {
    icon: "/icons/icon.ico",
  },
};

// export const metadata = {
//   title: "Sigma Phi Delta Initiation",
//   description: "Initiation: 9/19/24.",
//   icons: {
//     icon: "/icons/icon.ico",
//   },
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
