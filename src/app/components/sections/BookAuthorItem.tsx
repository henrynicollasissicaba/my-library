import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export default function BookAuthorItem({ author }: { author: string }){
    return(
        <div className="flex items-center gap-2 my-4">
            <TipsAndUpdatesIcon fontSize="small" className="text-yellow-300" />
            <h2 className="text-zinc-400 italic text-sm">{author}</h2>
        </div>
    )
}