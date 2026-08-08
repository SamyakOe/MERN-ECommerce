import { ChevronUp, ChevronDown } from "lucide-react";

export default function SortableTableHeader({ label, sortKey, sortConfig, onSort }) {
    const isActive = sortConfig.key === sortKey;

    return (
        <th
            onClick={() => onSort(sortKey)}
            className="py-4 px-6 cursor-pointer select-none hover:bg-neutral-100"
        >
            <div className="flex items-center gap-1">
                <span>{label}</span>
                <div className="flex flex-col">
                    <ChevronUp className={`size-3 ${sortConfig.direction === "asc" && isActive ? "text-neutral-800" : "text-neutral-300"}`} />
                    <ChevronDown className={`size-3 ${sortConfig.direction === "desc" && isActive ? "text-neutral-800" : "text-neutral-300"}`} />
                </div>
            </div>
        </th>
    );
}