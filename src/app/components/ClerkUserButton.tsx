'use client'

import { useClerk } from '@clerk/nextjs'
import LogoutIcon from '@mui/icons-material/Logout';

export default function SignOutButton(){
  const { signOut } = useClerk()

  return (
    <button 
      onClick={() => signOut({ redirectUrl: '/login' })}
      className="flex gap-2 items-center hover:text-primary-600 transition-colors"
    >
      Sair
      <LogoutIcon fontSize="small"/>
    </button>
  )
}