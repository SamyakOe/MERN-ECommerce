import { Search,X } from "lucide-react";

function SearchBar({search, setSearch,dark=true, item}) {
  return (
    // <div className="flex items-center gap-2 border border-gray-300 px-2 py-1 focus-within:border-gray-600">
    //   <input type="text" placeholder="Search..." className="border-none px-2 focus:outline-none"/>
    //   <Search className="hover:text-gray-600 cursor-pointer" />
    // </div>
    <div className="relative mt-4 w-full ">
          <Search className="size-5 absolute top-3 left-4 text-neutral-400" />
          <input
            type="text"
            name="search"
            placeholder={`Search ${item}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`rounded-2xl  ${dark?"text-white focus:bg-white/15 focus:border-white/40":"text-black "} bg-white border border-black/10 text-sm py-3 pl-12  focus:outline-none focus:bg-white/15 focus:border-black/40 w-full`}
          />
          <X
            onClick={() => setSearch("")}
            className={`size-5 absolute top-3 right-4 text-neutral-400 cursor-pointer ${dark?"hover:text-neutral-100":"hover:text-neutral-900"}`}
          />
        </div>
  );
}

export default SearchBar;
