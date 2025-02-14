"use client"

import { PaginationItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export default function PaginationComponent({ currentPage, totalPages }: PaginationProps){
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return(
        <Pagination 
            page={currentPage}
            count={totalPages}
            variant="outlined"
            color="primary"
            className="dark"
            renderItem={(item) => (
                <PaginationItem 
                    component={Link}
                    href={createPageUrl(item.page ?? 1)}
                    {...item}
                    sx={{
                        '&.MuiPaginationItem-colorPrimary': {
                            color: '#fff',
                            borderColor: "#888888"
                        },
                        '&.Mui-selected': {
                            borderColor: "#ff5900",
                            color: "#ff5900",
                            backgroundColor: "transparent"
                        }
                    }}
                />
            )}
            sx={{
                '& .MuiPaginationItem-ellipsis': {
                    color: "#fff"
                },
                '&.MuiPagination-outlined': {
                  backgroundColor: '#1D1D21',
                  padding: ".5rem 1rem",
                  borderRadius: ".5rem"
                }
            }}
        />
    )
}