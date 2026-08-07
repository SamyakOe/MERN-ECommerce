import { SearchX } from "lucide-react";

function NoProduct() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-fit py-20 gap-2">
      <SearchX className="size-12 text-neutral-400" />
      <span className="font-semibold text-lg">No Product Found</span>
      <span className="font-medium text-neutral-400 text-sm">
        We can't find any item
      </span>
    </div>
  );
}

export default NoProduct;
