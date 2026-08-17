// const CategoryFilter = ({ categories, selected, setSelected }) => {
//   return (
//     <div className="flex flex-wrap justify-center gap-2.5 px-1 sm:gap-3 lg:gap-4">
//       <button
//         onClick={() => setSelected('All')}
//         className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 ${
//           selected === 'All'
//             ? 'bg-orange-500 text-white shadow-lg'
//             : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500'
//         }`}
//       >
//         All
//       </button>

//       {categories.map((category) => (
//         <button
//           key={category.id}
//           onClick={() => setSelected(category.name)}
//           className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 ${
//             selected === category.name
//               ? 'bg-orange-500 text-white shadow-lg'
//               : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500'
//           }`}
//         >
//           {category.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default CategoryFilter;

import { ChevronRight } from 'lucide-react';

const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {/* All */}
        <button
          onClick={() => setSelected('All')}
          className={`group flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
            selected === 'All'
              ? 'bg-gray-950 text-white shadow-lg shadow-gray-950/10'
              : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition ${
              selected === 'All' ? 'bg-orange-400' : 'bg-gray-300'
            }`}
          />
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelected(category.name)}
            className={`group flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
              selected === category.name
                ? 'bg-gray-950 text-white shadow-lg shadow-gray-950/10'
                : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition ${
                selected === category.name
                  ? 'bg-orange-400'
                  : 'bg-gray-300 group-hover:bg-orange-400'
              }`}
            />

            {category.name}
          </button>
        ))}

        <button
          type="button"
          className="hidden shrink-0 items-center gap-1 rounded-full px-3 py-3 text-sm font-medium text-gray-400 transition hover:text-gray-900 lg:flex"
        >
          More
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
