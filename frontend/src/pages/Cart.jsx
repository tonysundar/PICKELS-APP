import React, { useState, useContext, useEffect } from 'react';
import { ShopeContext } from '../context/ShopContext';
import Tittle from '../components/Tittle';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopeContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    // Map through cartItems to extract relevant data
    Object.entries(cartItems).forEach(([productId, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {
        if (quantity > 0) {
          tempData.push({
            id: productId,
            size,
            quantity
          });
        }
      });
    });

    setCartData(tempData);
  }, [cartItems]);

  // Add a check to ensure cartData is properly populated before rendering
  if (cartData.length === 0) {
    return <div>Your cart is empty!</div>; // Better fallback UI for empty cart
  }

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Tittle text1={'YOUR'} text2={'ORDERS'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            // Find the corresponding product data
            const productData = products.find((product) => product._id === item.id);
            if (!productData) return null; // Skip if product not found

            const priceIndex = productData.sizes.indexOf(item.size);
            const selectedPrice = productData.price[priceIndex] || productData.price[0];

            return (
              <div key={index} className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
                <div className="flex items-start gap-6">
                  <img className="w-16 sm:w-20" src={productData.images[0]} alt={productData.name} />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                    <div className="flex items-center gap-5 mt-2">
                      <p className="bg-slate-50 p-1">{currency}{selectedPrice}</p>
                      <p className="px-2 sm:px-3 sm:py-1 border p-1 bg-slate-50">{item.size}</p>
                    </div>
                  </div>
                </div>

                {/* Quantity input */}
                <input 
                  onChange={(e) => {
                    const newQuantity = e.target.value === '' || e.target.value === '0' ? 0 : Number(e.target.value);
                    updateQuantity(item.id, item.size, newQuantity);
                  }} 
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" 
                  type="number" 
                  min={1} 
                  value={item.quantity} 
                />

                {/* Remove button */}
                <img 
                  onClick={() => updateQuantity(item.id, item.size, 0)} 
                  className="w-4 mr-4 sm:w-5 cursor-pointer" 
                  src={assets.bin_icon} 
                  alt="Remove" 
                />
              </div>
            );
          })
        }
      </div>

      {/* Cart total and checkout button */}
      <div className="flex justify-end my-10">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button 
              onClick={() => navigate('/Placeorder')} 
              className="bg-green-300 text-black text-sm my-8 px-8 py-3"
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
