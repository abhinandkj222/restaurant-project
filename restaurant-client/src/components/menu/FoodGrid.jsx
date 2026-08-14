import { useState } from 'react';

import FoodCard from './FoodCard';
import FoodDetailsModal from './FoodDetailsModal';

const FoodGrid = ({ foods }) => {
  const [selectedFood, setSelectedFood] = useState(null);

  if (foods.length === 0) {
    return (
      <div className="px-4 py-16 text-center sm:py-20">
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          No food found 😔
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base">
          Try another search.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Food Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4 xl:gap-8">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} onClick={setSelectedFood} />
        ))}
      </div>

      {/* Food Details Modal */}
      <FoodDetailsModal
        food={selectedFood}
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </>
  );
};

export default FoodGrid;
