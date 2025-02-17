import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "../components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "My Library | Public",
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
        <body
          className={`${poppins.className} antialiased`}
        >
          <Toaster richColors/>
          <div className="min-h-screen flex flex-col bg-slate-50">
            {children}
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
