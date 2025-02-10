import CategoryIcon from '@mui/icons-material/Category';

export default function BookCategoryItem({ category }: { category: string }){
    return(
        <div className="mt-5 py-2 px-4 bg-neutral-200 rounded-md w-fit flex gap-2">
            <CategoryIcon className="text-zinc-400" fontSize="small"/>
            <p className="italic text-zinc-400 font-semibold text-sm">{category}</p>
        </div>
    )
}