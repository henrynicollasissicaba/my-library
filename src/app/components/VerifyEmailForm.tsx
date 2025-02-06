'use client'

import Input from "./Input"
import { ShinyButton } from "./ShinyButton"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { toast } from "sonner"
import { isClerkAPIResponseError } from "@clerk/nextjs/errors"

export default function VerifyEmailForm(){
    const [code, setCode] = useState("")
    const router = useRouter()

    const { isLoaded, signUp, setActive } = useSignUp()

    const handleCode = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!isLoaded) return

        try {
            const signUpAttempt = await signUp.attemptEmailAddressVerification({ code })

            if(!signUpAttempt.createdUserId){
                toast.error("Id de usuário não foi fornecido")
            }

            if(signUpAttempt.status === "complete"){
                await setActive({
                    session: signUpAttempt.createdSessionId
                })

                router.push("/")
            }

        } catch (error) {
            if (isClerkAPIResponseError(error)){
                toast.error(error.errors[0].message)
            }
        }
    }

    const handleResendCode = async () => {
        if(!isLoaded) return

        try {
            await signUp.prepareEmailAddressVerification({
                strategy: "email_code"
            })

        } catch (error) {
            if (isClerkAPIResponseError(error)){
                toast.error(error.errors[0].message)
            }
        }
    }

    return(
        <form onSubmit={handleCode} className="max-w-96 w-full flex flex-col gap-4">
            <Input 
                label="Insira o código de verificação"
                helperText="* Esse código foi enviado para o seu email"
                variant="outlined"
                fullWidth
                size="small"
                autoComplete="off"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex justify-between gap-2 flex-wrap">
                <ShinyButton type="button" onClick={handleResendCode} className="w-full sm:w-auto">Reenviar código</ShinyButton>
                <ShinyButton type="submit" className="w-full sm:w-auto">Verificar</ShinyButton>
            </div>
        </form>
    )
}