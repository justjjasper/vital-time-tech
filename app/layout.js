import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vital Time Tech Assigment",
  description: "A Next.js + Tailwind CSS Drag and Drop List that has a responsive web design, backed with a MongoDB database to fetch the Data with API, and powered by Node.js Express that is deployed through Amazon Web Services EC2 Instances.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
