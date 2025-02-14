'use client'

import { ShinyButton } from "@/app/components/ui/ShinyButton";
import Input from "../ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";

export default function LoginForm(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const { isLoaded, signIn, setActive } = useSignIn()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()

        if(!isLoaded) return

        try {
            const signInAttempt = await signIn.create({
                identifier: email,
                password
            })

            if(signInAttempt.status === "complete"){
                await setActive({
                    session: signInAttempt.createdSessionId
                })
                router.push('/')
            }

        } catch (error) {
            if (isClerkAPIResponseError(error)){
                toast.error(error.errors[0].message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return(
        <form onSubmit={handleSubmit} className="max-w-96 w-full flex flex-col gap-4">
            <Input 
                label="Email" 
                variant="outlined" 
                size="small" 
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div>
                <Input 
                    label="Senha" 
                    variant="outlined" 
                    size="small" 
                    fullWidth 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <a href="/reset-password" className="flex justify-end text-sm hover:text-primary-500 transition-colors p-1">
                    Esqueci minha senha
                </a>
            </div>
            <ShinyButton typeof="submit" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
            </ShinyButton>
            <a href="/register" className="text-sm hover:text-primary-500 transition-colors p-1 text-center">
                Não possui conta? Clique aqui para criar
            </a>
        </form>
    )
}