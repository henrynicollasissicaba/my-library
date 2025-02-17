import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import SideBar from "@/app/components/layout/SideBar";
import Footer from "../components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "My Library",
  description: "Uma aplicação web para cadastrar e gerenciar os livros que você possui, além de poder criar anotações sobre eles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body
          className={`${poppins.className} antialiased bg-neutral-800`}
        >
          <Toaster richColors/>
          <div className="grid lg:grid-cols-[17rem_1fr] text-[#F4F4F5]">
            <div>
              <SideBar />
            </div>
            <div className="flex flex-col min-h-screen w-full max-w-6xl mx-auto px-2">
              {children}
              <Footer />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
