import React, { useContext, useState } from 'react';
import { ShopeContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, images, name, price, sizes }) => {
    const { currency } = useContext(ShopeContext);

    // Default size (first size)
    const [selectedSize, setSelectedSize] = useState(sizes ? sizes[0] : null);

    // Get the corresponding price for the selected size
    const priceIndex = sizes ? sizes.indexOf(selectedSize) : 0; // Get index of selected size
    const selectedPrice = price && price[priceIndex] ? price[priceIndex] : price[0]; // Default to first price if not found

    // Check if selected price is valid
    const validPrice = isNaN(selectedPrice) ? 0 : selectedPrice;

    // Format the price with commas and decimals
    const formattedPrice = new Intl.NumberFormat().format(validPrice);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden w-42 h-52 rounded shadow'>
                <img
                    className='hover:scale-110 transition m-8 mx-auto my-auto ease-in-out w-full h-full object-cover'
                    src={images[0]}  // Using first image from the image array
                    alt='pickles image'
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>

            {/* Size Selection Dropdown */}
            <div className="flex gap-2">
                {sizes && sizes.map((size, index) => (
                    <button
                        key={index}
                        className={`px-3 py-1 border rounded ${selectedSize === size ? 'bg-gray-300' : 'bg-gray-100'}`}
                        onClick={() => setSelectedSize(size)} // Update selected size
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Display the price for the selected size */}
            <p className='text-sm font-medium'>
                Starting AT {currency}{formattedPrice}
            </p>
        </Link>
    );
};

export default ProductItem;
