import { Clock4 } from "lucide-react"
export default function Processing() {
    return (
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
            <Clock4 className="size-3"/>
            Processing
        </div>
    )
}
