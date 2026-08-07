import { Check } from "lucide-react";
export default function CheckBox({ checked, onChange }) {
    return (
        <button
            type="button"
            onClick={onChange}
            className={`size-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${checked
                    ? 'bg-black border-black'
                    : 'border-neutral-300 hover:border-neutral-500 bg-white'
                }`}
        >
            {checked && <Check className="size-3 text-white stroke-3" />}
            {!checked && <span className="w-2.5 h-0.5 bg-white rounded-full" />}
        </button>
    );
}