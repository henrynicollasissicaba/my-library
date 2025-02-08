'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function MenuItemLink({ path, label, icon }: {
    path: string,
    label: string,
    icon: React.ReactElement
}){
    const pathname = usePathname()
    const isActive = pathname === path

    return(
        <Link 
            href={path} 
            className={`px-4 py-2 hover:bg-[#2a2a2f] hover:text-primary-400 rounded-md transition-colors
            ${isActive ? "bg-[#2a2a2f] text-primary-400" : ""} flex items-center justify-start gap-5`}
        >
            {icon}
            {label}
        </Link>
    )
}