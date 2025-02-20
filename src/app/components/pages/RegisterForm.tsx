'use client'

import { FormEvent, useEffect, useState } from "react"
import Input from "@/app/components/ui/Input"
import { ShinyButton } from "@/app/components/ui/ShinyButton"
import { useSignUp } from "@clerk/nextjs"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Link from "next/link"
import LoadingSpinner from "../layout/LoadingSpinner"

export default function RegisterForm(){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifying, setVerifying] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const { isLoaded, signUp } = useSignUp()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()

        if(!isLoaded) return

        try {
            await signUp.create({
                firstName,
                lastName,
                emailAddress: email,
                password
            })

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

            setVerifying(true)

        } catch (error) {
            if(isClerkAPIResponseError(error)){
                toast.error(error.errors[0].longMessage)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(verifying){
            router.push('/verify-email')
        }
    }, [router, verifying])

    return(
        <form onSubmit={handleSubmit} className="max-w-96 w-full flex flex-col gap-4">
            <Input 
                label="Nome"
                variant="outlined" 
                size="small" 
                fullWidth
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="off"
            />
            <Input 
                label="Sobrenome"
                variant="outlined" 
                size="small" 
                fullWidth
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="off"
            />
            <Input 
                label="Endereço de email válido" 
                helperText="* Você receberá um código de validação por email" 
                variant="outlined" 
                size="small"
                autoComplete="off"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
                label="Senha"
                variant="outlined"
                size="small"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div id="clerk-captcha"></div>
            <ShinyButton className="mt-2" typeof="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner /> : "Cadastrar"}
            </ShinyButton>
            <Link href="/login" className="text-sm hover:text-primary-500 transition-colors p-1 text-center">
                Já possui uma conta? Clique aqui para entrar
            </Link>
        </form>
    )
}