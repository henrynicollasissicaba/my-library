"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"

import { BsBarChart, BsBookmarkPlus, BsBookmarkDash, BsBookmarkCheck, BsBookHalf } from "react-icons/bs";

interface NavLinkInterface {
    label: string,
    href: string, 
    icon: React.ReactNode
}

export const navLinks: NavLinkInterface[] = [
    { label: "Dashboard", href: "/", icon: <BsBarChart /> },
    { label: "Adicionar livro", href: "/add-book", icon: <BsBookmarkPlus /> },
    { label: "Ver todos os livros", href: "/all-books", icon: <BsBookHalf /> },
    { label: "Livros lidos", href: "/read-books", icon: <BsBookmarkCheck /> },
    { label: "Livros não lidos", href: "/unread-books", icon: <BsBookmarkDash /> }
]

export const NavLink = ({ label, href, icon }: NavLinkInterface) => {

    const pathnameme = usePathname()
    return (
        <li className={`flex justify-between py-2 px-4 rounded-md cursor-pointer shadow-lg
            items-center hover:bg-[#ecebeb] hover:text-[#323232] transition-all
            ${pathnameme === href ? "bg-[#ecebeb] text-[#323232]" : "bg-[#323232] text-[#ecebeb]"}`}
        >
            <Link href={href} className="w-full">{label}</Link>
            <span className="h-5 w-5">{icon}</span>
        </li>
    )
}