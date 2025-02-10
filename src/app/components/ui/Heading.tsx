export default function Heading({ title, highlightWord, className }: {
    title: string,
    highlightWord: string,
    className?: string
}){
    return(
        <h1 className={`font-bold text-2xl ${!className ? "mt-3 ml-3" : "mt-0 ml-0"}`}
        >
            {title} <span className="text-primary-500">{highlightWord}</span>
        </h1>
    )
}