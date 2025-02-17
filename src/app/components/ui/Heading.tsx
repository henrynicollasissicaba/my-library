export default function Heading({ title, highlightWord }: {
    title: string,
    highlightWord: string
}){
    return(
        <h1 className="text-3xl font-bold mr-12 mt-1"
        >
            {title} <span className="text-primary-500">{highlightWord}</span>
        </h1>
    )
}