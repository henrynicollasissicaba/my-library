'use client'

import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import MenuItemLink from "@/app/components/sections/MenuItemLink";
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';
import ClerkUserButton from '@/app/components/ClerkUserButton';


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
    { key: 6, path: "/reading-books", label: "Livros em leitura", icon: <ModelTrainingIcon /> },
    { key: 5, path: "/non-books-read", label: "Livros não lidos", icon: <RemoveDoneIcon /> }
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
                    lg:translate-x-0 transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-[-17rem]"}
                    shadow-md`}
                >
                <nav className="flex flex-col gap-10">
                    <div className="flex items-center gap-2">
                        <AutoStoriesIcon className="text-primary-600"/>
                        <h1 className="text-2xl font-bold">My <span className="text-primary-600">Library</span></h1>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {menuLinks.map((link) => (
                            <MenuItemLink key={link.key} path={link.path} label={link.label} icon={link.icon} />
                        ))}
                    </ul>
                </nav>
                <div className="block ml-auto">
                    <ClerkUserButton />
                </div>
            </aside>
            <button 
                className={`absolute top-2 right-2 lg:hidden z-50`} 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <HighlightOffIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </button>
        </>
    )
}