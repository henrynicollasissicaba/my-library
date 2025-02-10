import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function BookTitleItem({ title }: { title: string }) {
    return(
        <div className="flex gap-2">
            <MenuBookIcon />
            <h1 className="text-lg font-bold text-zinc-200">{title}</h1>
        </div>
    )
}