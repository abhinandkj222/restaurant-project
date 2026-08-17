// import { Search, X } from 'lucide-react';

// const SearchBar = ({ search, setSearch }) => {
//   return (
//     <div className="relative w-full">
//       {/* Search Icon */}
//       <Search
//         size={18}
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:left-5 sm:h-5 sm:w-5"
//       />

//       {/* Input */}
//       <input
//         type="text"
//         placeholder="Search delicious food..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-gray-700 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:rounded-2xl sm:py-4 sm:pl-14 sm:pr-14 sm:text-base"
//       />

//       {/* Clear Button */}
//       {search && (
//         <button
//           onClick={() => setSearch('')}
//           className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 text-gray-400 transition hover:bg-orange-50 hover:text-orange-500 sm:right-4 sm:p-2"
//           aria-label="Clear search"
//         >
//           <X size={18} className="sm:h-5 sm:w-5" />
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchBar;

import { Search, X, SlidersHorizontal } from 'lucide-react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="flex w-full items-center gap-3">
      <div className="relative flex-1">
        {/* Search icon */}
        <Search
          size={20}
          strokeWidth={1.8}
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search dishes, desserts, drinks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-12 text-sm font-medium text-gray-900 shadow-[0_8px_30px_rgba(0,0,0,0.04)] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-gray-300 focus:shadow-[0_10px_35px_rgba(0,0,0,0.07)] focus:ring-4 focus:ring-orange-500/5 sm:h-16 sm:rounded-[20px] sm:text-base"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-orange-50 hover:text-orange-500"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter button */}
      <button
        type="button"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:border-gray-300 hover:bg-gray-50 sm:h-16 sm:w-16 sm:rounded-[20px]"
        aria-label="Filters"
      >
        <SlidersHorizontal size={20} strokeWidth={1.8} />
      </button>
    </div>
  );
};

export default SearchBar;
