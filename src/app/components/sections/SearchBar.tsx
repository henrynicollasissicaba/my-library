import { InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { customInputColors } from "../pages/CreateBookForm";
import Input from "../ui/Input";
import React from "react";

interface SearchBarProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchBar({ onChange }: SearchBarProps){
    return(
        <div className="mt-7">
            <Input 
                label="Buscar livro por título ou autor"
                fullWidth
                autoComplete="off"
                colors={customInputColors}
                size="small"
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon className="text-white"/>
                            </InputAdornment>
                        ),
                    },
                }}

                onChange={onChange}
            />
        </div>
    )
}