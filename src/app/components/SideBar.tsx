'use client'

import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MenuItemLink from "./MenuItemLink";
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import Heading from './Heading';


interface MenuLink {
    key: number
    path: string
    label: string
    icon: React.ReactElement
}

const menuLinks: MenuLink[] = [
    { key: 1, path: "/", label: "Início", icon: <HomeIcon/> },
    { key: 2, path: "/add-book", label: "Cadastrar livro", icon: <AddCircleOutlineRoundedIcon /> },
    { key: 3, path: "/all-books", label: "Livros cadastrados", icon: <AutoStoriesIcon /> },
    { key: 4, path: "/books-read", label: "Livros lidos", icon: <DoneAllIcon /> },
    { key: 5, path: "/non-books-read", label: "Livros não lidos", icon: <RemoveDoneIcon /> },
    { key: 6, path: "/reading-books", label: "Livros em leitura", icon: <ModelTrainingIcon /> }
]

export default function SideBar(){
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const path = usePathname()

    useEffect(() => {
        setIsSidebarOpen(false)
    }, [path])

    return(
        <>
            <aside 
                className={`bg-neutral-300 min-h-screen fixed w-[17rem] p-4 flex flex-col justify-between z-50
                    md:translate-x-0 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-[-17rem]"}`}
                >
                <nav className="flex flex-col gap-10">
                    <div className="flex items-center gap-2">
                        <AutoStoriesIcon />
                        <Heading title="My" highlightWord="Library"/>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {menuLinks.map((link) => (
                            <MenuItemLink key={link.key} path={link.path} label={link.label} icon={link.icon} />
                        ))}
                    </ul>
                </nav>
                <div className="block ml-auto">
                    <UserButton appearance={{ elements: { userButtonAvatarBox: { width: "2.5rem", height: "2.5rem" } }}}/>
                </div>
            </aside>
            <button 
                className={`absolute top-2 right-2 md:hidden z-50`} 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <HighlightOffIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </button>
        </>
    )
}