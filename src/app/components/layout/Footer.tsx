export default function Footer(){
    return(
        <p className="text-[.625rem] text-primary-600 text-center mt-auto mb-2 font-bold tracking-wide">
            &copy; {new Date().getFullYear()} My Library | Desenvolvido por 
            <a 
                href="https://www.linkedin.com/in/henry-nicollas-issicaba-neves-05a54024a/" 
                target="_blank" 
                className="border-b-2 border-primary-600"> Henry Nicollas</a>
        </p>
    )
}