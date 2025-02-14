'use client'

import { useAuth, useSignIn } from "@clerk/nextjs"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { toast } from "sonner"
import Input from "@/app/components/ui/Input"
import { ShinyButton } from "@/app/components/ui/ShinyButton"

export default function ResetPasswordForm(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [successfulCreation, setSuccessfulCreation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const { isSignedIn } = useAuth()
    const { isLoaded, signIn, setActive } = useSignIn()

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        router.push('/')
    }

    const create = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()
        
        await signIn?.create({
            identifier: email,
            strategy: "reset_password_email_code"
        }).then(() => {
            setSuccessfulCreation(true)
        }).catch((error) => {
            if (isClerkAPIResponseError(error)){
                toast.error(error.errors[0].longMessage)
            }
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const reset = async (e: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)
        e.preventDefault()

        await signIn.attemptFirstFactor({
            strategy: "reset_password_email_code",
            code,
            password
        }).then((result) => {
            if(result.status === "complete") setActive({ session: result.createdSessionId })
        }).catch((error) => {
            if (isClerkAPIResponseError(error)) toast.error(error.errors[0].longMessage)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return(
        <form onSubmit={!successfulCreation ? create : reset} className="max-w-96 w-full flex flex-col gap-4">
            {!successfulCreation && ( 
                <>
                    <Input
                        label="Email"
                        helperText="* Insira o email conectado na aplicação"
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                    <ShinyButton type="submit" disabled={isLoading}>
                        {isLoading ? "Enviando..." : "Enviar código para redefinição de senha"}
                    </ShinyButton>
                </>
             )}
            {successfulCreation && ( 
                <>
                    <Input
                        label="Nova senha"
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        type="password"
                    />
                    <Input
                        label="Código para redefinição de senha"
                        helperText="* Esse código foi enviado para seu email fornecido"
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        autoComplete="off"
                    />
                    <ShinyButton type="submit">
                        {isLoading ? "Redefinindo..." : "Redefinir senha"}
                    </ShinyButton>
                </>
             )}
        </form>
    )
}