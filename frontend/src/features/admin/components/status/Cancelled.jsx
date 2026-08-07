import { Ban } from "lucide-react"
export default function Cancelled() {
    return (
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-full text-xs font-medium">
            <Ban className="size-3"/>
            Cancelled
        </div>
    )
}
