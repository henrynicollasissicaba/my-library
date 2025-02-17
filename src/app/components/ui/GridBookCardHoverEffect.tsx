'use client'

import { cn } from "@/app/components/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import BookCardItem from "./BookCardItem";
import { Book } from "@/models/Book";

export const GridBookCardHoverEffect = ({
  books,
  className,
}: {
  books: Book[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 mt-4 mb-5",
        className
      )}
    >
      {books.map((book, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onTouchStart={() => setHoveredIndex(idx)}
          onTouchMove={() => setHoveredIndex(idx)}
          onTouchEnd={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className={clsx("relative",
              book.status === "Não lido" && "border-red-600",
              book.status === "Lendo" && "border-blue-500",
              book.status === "Lido" && "border-green-500"
            )}>
            <BookCardItem book={book} />
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full px-2 py-4 overflow-hidden bg-neutral-300 border-l-2 relative z-20 transition-all",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
