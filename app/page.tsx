"use client"

import Heading from "./components/Heading";
import { DashboardData, dashboardData } from "./components/DashboardData"
import { useLibrary } from "./hooks/useLibrary";

export default function Home() {
  const { books, readBooks, unreadBooks } = useLibrary();

  const booksData = [books.length, readBooks.length, unreadBooks.length]

  return (
    <section className="pb-6">
      <Heading>Dashboard</Heading>

      <div className="grid md:grid-cols-6 gap-5 grid-cols-1">
        {dashboardData.map(({ h2, fontColor, p, className }, index) => (
          <DashboardData
          h2={h2}
          fontColor={fontColor} 
          p={p} 
          className={className} 
          span={booksData[index]} 
          key={h2}/>
        ))}
      </div>
    </section>
  );
}
