import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavSidebar from "@/components/sidebar";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EDM Chatbot",
  description: "Talk, Learn, find events about EDM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <NavSidebar />
          <div className="w-full bg- bg-gradient-to-r from-[#746666] to-[#9c9494]">
            <SidebarTrigger />
            {children}
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
