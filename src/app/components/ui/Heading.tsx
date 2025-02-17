export default function Heading({ title, highlightWord }: {
    title: string,
    highlightWord: string
}){
    return(
        <h1 className="text-3xl font-bold mt-4 ml-3 mr-12"
        >
            {title} <span className="text-primary-500">{highlightWord}</span>
        </h1>
    )
}