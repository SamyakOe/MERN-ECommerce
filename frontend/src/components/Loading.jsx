import { Loader2 } from "lucide-react";
export default function Loading() {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-4.5rem)]">
            <Loader2 className="size-8 animate-spin text-neutral-400" />
        </div>
    )
}