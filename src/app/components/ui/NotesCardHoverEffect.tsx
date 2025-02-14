"use client"

import { Note } from "@/models/Note";
import { cn } from "../lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import NoteCardItem from "./NoteCardItem";

export default function NotesCardHoverEffect({
    notes,
    className
}: {
    notes: Note[]
    className?: string
}){
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 mt-4 mb-5",
        className
      )}
    >
      {notes.map((note, idx) => (
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
          <Card className="">
            <NoteCardItem note={note} />
          </Card>
        </div>
      ))}
    </div>
  );
}

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
                "rounded-2xl h-full w-full px-2 py-4 bg-neutral-300 border-l-2 border-primary-600 relative z-20 transition-all",
                className
            )}
        >
            <div className="relative z-50">
                <div className="p-2">{children}</div>
            </div>
        </div>
);
}

  