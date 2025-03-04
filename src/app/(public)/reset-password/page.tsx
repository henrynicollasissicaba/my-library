import ResetPasswordForm from "@/app/components/pages/ResetPasswordForm";
import Image from "next/image";

export default function ResetPasswordPage(){
    return(
        <main className="mt-auto w-full overflow-hidden flex flex-row-reverse justify-center items-center gap-4 flex-wrap-reverse p-4 bg-slate-50">
            <Image src="/resetpassword.svg" alt="reset password img" width={500} height={500} />
            <div className="flex flex-col items-center justify-center w-full max-w-[30rem] md:h-[24rem] px-6 py-8 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                <h1 className="mb-10 font-bold text-2xl">Redefinir <span className="text-primary-600">senha</span>.</h1>
                <ResetPasswordForm />
            </div>
        </main>
    )
}