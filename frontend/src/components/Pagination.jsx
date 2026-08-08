import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, limit, total, setPage }) {
    if(total<1){
        return null;
    }
    const totalPages = Math.ceil(total / limit);

    const handlePrev = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1)
        }
    }

    const handleNext = () => {
        if (page < totalPages) {
            setPage((prevPage) => prevPage + 1)
        }
    }

    return (
        <div className="flex items-center gap-2 justify-center my-8 text-neutral-500">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="p-2 size-10 border border-neutral-200 rounded-full hover:cursor-pointer hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                return (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`p-2 size-10 border rounded-full hover:cursor-pointer   ${pageNumber === page ? "bg-black text-white" : "hover:bg-neutral-50"}`}>
                        {pageNumber}
                    </button>
                )
            })}

            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="p-2 size-10 border border-neutral-200 rounded-full hover:cursor-pointer hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRight />
            </button>
        </div>
    )
}
