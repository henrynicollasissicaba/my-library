import Image from "next/image";

export default function Hero(){
    return(
        <main className="w-full mt-auto overflow-hidden flex justify-center items-center gap-4 flex-wrap-reverse p-4">
            <Image src="/heroImg.svg" alt="hero image" width={500} height={500}/>
            <div className="flex flex-col justify-center items-center gap-3 w-full max-w-[30rem] md:h-[24rem] px-6 py-8 rounded-md shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                <h1 className="font-bold text-xl">Seja bem vindo(a) ao <span className="text-primary-600">My Library</span>!</h1>
                <p className="text-zinc-600">Aqui você pode cadastrar e gerenciar os livros que você possui, além de <span className="text-primary-600">criar anotações</span> sobre eles.</p>
                <p className="font-bold text-xl mt-3">Vamos começar?</p>
                <div className="flex items-center gap-3 mt-5 flex-wrap">
                    <a 
                        href="/register" 
                        className="w-full sm:max-w-fit text-center px-6 py-2 rounded-lg hover:text-white hover:bg-primary-500 transition-colors shadow-lg border"
                    >
                        Registrar conta
                    </a>
                    <a 
                        href="/login" 
                        className="w-full sm:max-w-fit text-center px-6 py-2 rounded-lg hover:text-white hover:bg-primary-500 transition-colors shadow-lg border"
                    >
                        Entrar
                    </a>
                </div>
            </div>
        </main>
    )
}