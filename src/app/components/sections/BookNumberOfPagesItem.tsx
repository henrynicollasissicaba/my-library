import LayersIcon from "@mui/icons-material/Layers";

export default function BookNumberOfPagesIem({ number_of_pages }: { number_of_pages: number }){
    return(
        <div className="flex items-center gap-1">
          <LayersIcon />
          <p className="text-zinc-200">{number_of_pages} páginas</p>
        </div>
    )
}