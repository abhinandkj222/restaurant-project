import { useEffect, useState } from 'react';
import { Users, Check } from 'lucide-react';
import api from '../../services/api';

const TableSelector = ({ selectedTable, setSelectedTable }) => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTables = async () => {
    try {
      const response = await api.get('/tables');

      setTables(response.data.tables);
    } catch (error) {
      console.error('failed to fetch tables:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <p className="text-gray-500">Loading tables...</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Dine In
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Choose Your Table
        </h2>

        <p className="mt-2 text-gray-500">
          Select an available table for your order.
        </p>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          Available
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          Occupied
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          Reserved
        </div>
      </div>

      {/* Tables */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {tables.map((table) => {
          const isAvailable = table.status === 'available';

          const isSelected = selectedTable?.id === table.id;

          return (
            <button
              key={table.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => setSelectedTable(table)}
              className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                isSelected
                  ? 'border-orange-500 bg-orange-50 shadow-md'
                  : isAvailable
                    ? 'border-gray-200 bg-white hover:-translate-y-1 hover:border-orange-400 hover:shadow-md'
                    : 'cursor-not-allowed border-gray-100 bg-gray-50 opacity-60'
              }`}
            >
              {/* Selected */}
              {isSelected && (
                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
                  <Check size={15} />
                </div>
              )}

              {/* Table icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  isSelected
                    ? 'bg-orange-500 text-white'
                    : 'bg-orange-50 text-orange-500'
                }`}
              >
                <Users size={22} />
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                Table {table.table_number}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {table.capacity} {table.capacity === 1 ? 'seat' : 'seats'}
              </p>

              <p
                className={`mt-3 text-sm font-semibold ${
                  isSelected
                    ? 'text-orange-500'
                    : table.status === 'available'
                      ? 'text-green-600'
                      : table.status === 'occupied'
                        ? 'text-red-500'
                        : 'text-yellow-600'
                }`}
              >
                {isSelected
                  ? 'Selected'
                  : table.status.charAt(0).toUpperCase() +
                    table.status.slice(1)}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected table */}
      {selectedTable && (
        <div className="mt-6 rounded-2xl border border-orange-200 bg-orange-50 p-4">
          <p className="text-sm text-gray-500">Selected Table</p>

          <p className="mt-1 font-bold text-orange-600">
            Table {selectedTable.table_number}
            {' · '}
            {selectedTable.capacity} seats
          </p>
        </div>
      )}
    </div>
  );
};

export default TableSelector;
