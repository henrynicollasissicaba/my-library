import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AsideBar from "./components/AsideBar";
import { LibraryProvider } from "./contexts/LibraryContext";

const poppins = Poppins({
  weight: ["400", "500", "700"],
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "My Library",
  description: "Crie sua biblioteca! Adicione livros que você já leu, quer ler e mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.className} bg-[#414141] min-h-screen flex flex-col`}
      >
        <AsideBar />
        <main className="relative w-full sm:w-[calc(100%-270px)] left-0 
        pl-4 pr-4 sm:pl-10 sm:p-4 sm:left-[270px] min-h-[calc(100vh-340px)]">
              <LibraryProvider>
                {children}  
              </LibraryProvider>
        </main>
        <footer className="mt-auto">
          <p className="text-center text-[#ecebeb] text-[0.675rem] md:text-sm font-bold
          relative w-full sm:w-[calc(100%-270px)] sm:left-[270px] left-0 pb-1">
            &copy; Henry Nicollas Issicaba Neves - All Rights Reserved - 2024
          </p>
        </footer>
      </body>
    </html>
  );
}
