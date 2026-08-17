import { SearchX } from 'lucide-react';
import { useState } from 'react';

import FoodCard from './FoodCard';
import FoodDetailsModal from './FoodDetailsModal';

const FoodGrid = ({ foods }) => {
  const [selectedFood, setSelectedFood] = useState(null);

  if (foods.length === 0) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <SearchX size={27} strokeWidth={1.7} />
        </div>

        <h2 className="mt-5 text-xl font-bold tracking-tight text-gray-950 sm:text-2xl">
          No dishes found
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
          We couldn't find anything matching your search. Try another dish or
          category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-7">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onClick={setSelectedFood} />
        ))}
      </div>

      <FoodDetailsModal
        food={selectedFood}
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </>
  );
};

export default FoodGrid;
