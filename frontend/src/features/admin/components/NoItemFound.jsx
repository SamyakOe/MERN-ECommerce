export default function NoItemFound({item}){
    return(
        <div className="w-full flex items-center justify-center py-4 text-sm text-neutral-600">
            No {item} found.
        </div>
    )
}
