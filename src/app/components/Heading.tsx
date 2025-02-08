export default function Heading({ title, highlightWord, className }: {
    title: string,
    highlightWord: string,
    className?: string
}){
    return(
        <h1 className={`font-bold text-2xl ${className}`}
        >
            {title} <span className="text-primary-500">{highlightWord}</span>
        </h1>
    )
}