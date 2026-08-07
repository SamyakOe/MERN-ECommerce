import { CheckCircle } from "lucide-react"
export default function Delivered() {
    return (
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="size-3"/>
            Delivered
        </div>
    )
}
