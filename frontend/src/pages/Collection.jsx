import React, { useContext, useState, useEffect } from 'react';
import { ShopeContext } from '../context/ShopContext';
import Tittle from '../components/Tittle';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopeContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    let filtered = products;
  

    // Filter by category
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by search term
    if (search && showSearch) {
      const lowerCaseSearch = search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(lowerCaseSearch)
      );
    }

    setFilterProducts(filtered);
  }, [selectedCategory, search, showSearch, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Sidebar for Categories */}
      <div className="flex-1 p-4 border select bg-gray-200 h-full min-h-[200px]">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Tittle text1={selectedCategory === 'ALL' ? 'ALL' : selectedCategory.toUpperCase()} text2={' PICKLES'} />
        </div>
        <div className="flex flex-col gap-2">
          <button
            className={`py-2 px-4 rounded ${selectedCategory === 'ALL' ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
            onClick={() => setSelectedCategory('ALL')}
          >
            All Pickles
          </button>
          <button
            className={`py-2 px-4 rounded ${selectedCategory === 'veg' ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
            onClick={() => setSelectedCategory('veg')}
          >
            Veg Pickles
          </button>
          <button
            className={`py-2 px-4 rounded ${selectedCategory === 'nonveg' ? 'bg-gray-300' : 'bg-gray-100'} hover:bg-gray-200`}
            onClick={() => setSelectedCategory('nonveg')}
          >
            Non-Veg Pickles
          </button>
        </div>
      </div>

      {/* Display Filtered Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
        {filterProducts.map((item, index) => (
          <ProductItem
            key={index}
            name={item.name}
            id={item._id}
            price={item.price} // Pass only the starting price
            images={item.images}
          />
        ))}
      </div>
    </div>
  );
};

export default Collection;
