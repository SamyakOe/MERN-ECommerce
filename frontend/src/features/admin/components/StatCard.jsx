import { ChevronDown, ChevronUp } from "lucide-react";

export default function StatCard({ label, icon, value, change, sub, up }) {
    return (
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col gap-3 w-full">
            <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-neutral-500">{label}</p>
                <div className="size-8 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400">{icon}</div>
            </div>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {/* <div className="flex items-center gap-1.5">
                <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${up ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                    {up ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}{change}
                </span>
                {sub && <span className="text-xs text-neutral-400">{sub}</span>}
            </div> */}
        </div>
    )
}
