import { Search, X } from 'lucide-react';

const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative w-full">
      {/* Search Icon */}
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:left-5 sm:h-5 sm:w-5"
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search delicious food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-11 text-sm text-gray-700 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 sm:rounded-2xl sm:py-4 sm:pl-14 sm:pr-14 sm:text-base"
      />

      {/* Clear Button */}
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-full p-1.5 text-gray-400 transition hover:bg-orange-50 hover:text-orange-500 sm:right-4 sm:p-2"
          aria-label="Clear search"
        >
          <X size={18} className="sm:h-5 sm:w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
