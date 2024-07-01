import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "برنج دنوج",
  description: "برنج درجه شمال را از ما بخواهید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
        <body className={inter.className}>
            <ReduxProvider>
                {children}
            </ReduxProvider>
        </body>
    </html>
  );
}
