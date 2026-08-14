const CategoryFilter = ({ categories, selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2.5 px-1 sm:gap-3 lg:gap-4">
      <button
        onClick={() => setSelected('All')}
        className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 ${
          selected === 'All'
            ? 'bg-orange-500 text-white shadow-lg'
            : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500'
        }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelected(category.name)}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:py-3 ${
            selected === category.name
              ? 'bg-orange-500 text-white shadow-lg'
              : 'border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
