"use client"

import Image from "next/image"
import Gif from "../assets/reading-book.gif"
import { NavLink, navLinks } from "./NavLink"
import { IoMenu } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation";

const AsideBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])


    return (
        <header>
            <button className="text-[#ecebeb] bg-[#414141] w-full sm:hidden cursor-pointer p-2"
                    onClick={() => setIsOpen(!isOpen)}
            >
                <IoMenu className="w-8 h-8"/>
            </button>
            <aside className={`fixed bg-[#585858] z-10 top-0 bottom-0 px-6 w-[270px]
                shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden max-h-screen
                -translate-x-96 sm:-translate-x-0 transition-all ${isOpen ? 
                "translate-x-0" : "-translate-x-96"}`}
            >
                <nav className="mt-2 sm:mt-4">
                    <ul className="flex flex-col gap-4">
                        <button className="block sm:hidden ml-auto" onClick={() => setIsOpen(!isOpen)}>
                            <AiOutlineCloseCircle className="w-8 h-8 text-[#ecebeb]" />
                        </button>
                        {navLinks.map(({ label, href, icon }) => (
                            <NavLink key={label} label={label} href={href} icon={icon} />
                        ))}
                    </ul>
                </nav>
                <Image src={Gif} width={240} height={240} alt="gif de livro" className="block mx-auto"/>
            </aside>
        </header>
    )
}

export default AsideBar