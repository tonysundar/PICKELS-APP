import React, { useContext, useMemo } from 'react';
import { ShopeContext } from '../context/ShopContext';
import Tittle from './Tittle';

const CartTotal = () => {
  const { currency, delivery_fee, cartItems, products } = useContext(ShopeContext);

  // Calculate the total price of the items in the cart
  const getCartAmount = useMemo(() => {
    let totalAmount = 0;

    // Loop over cartItems and products to calculate total price
    for (const itemId in cartItems) {
      const product = products.find((product) => product._id === itemId); // Corrected to _id

      // Ensure the product is found and has the 'sizes' property
      if (product && product.sizes) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const sizeIndex = product.sizes.indexOf(size);
            if (sizeIndex !== -1) {
              // Multiply the price by the quantity for each item
              totalAmount += product.price[sizeIndex] * cartItems[itemId][size];
            }
          }
        }
      }
    }

    return totalAmount;
  }, [cartItems, products]); // Recalculate whenever cartItems or products change

  // Calculate the total price including shipping fee
  const getTotalAmount = useMemo(() => {
    const subtotal = getCartAmount;
    return subtotal + (subtotal === 0 ? 0 : delivery_fee);
  }, [getCartAmount, delivery_fee]); // Recalculate whenever subtotal or delivery fee changes

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Tittle text1={'Pickles'} text2={'Total Amount'} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency} {getCartAmount}.00</p>
        </div>
        <hr />
        {/* Shipping Fee */}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}.00</p>
        </div>
        <hr />
        {/* Total */}
        <div className="flex justify-between">
          <b>Total</b>
          <b>{currency} {getTotalAmount}.00</b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
