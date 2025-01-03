import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { ShopeContext } from '../context/ShopContext';
import Tittle from '../components/Tittle';

const Order = () => {
  const { backendUrl, token, currency } = useContext(ShopeContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        console.log("No token found.");
        return; // Don't proceed if there's no token
      }

      const response = await axios.post(`https://pickels-app-1.onrender.com/api/order/userorders`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        let allOrders = [];
        response.data.orders.forEach(order => {
          order.items.forEach(item => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod; // Correct key
            item['date'] = order.date;
            allOrders.push(item);
          });
        });
        setOrderData(allOrders.reverse()); // Reverse the order for latest first
      } else {
        console.log("No successful response.");
      }
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Tittle text1={"YOUR"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          orderData.map((item, index) => (
            <div key={index} className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ">
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.images[0]} alt="" />
                <div>
                  <p className="sm:text base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>{currency} {item.price[0]}</p>
                    <p>Quantity: {item.quantity} </p>
                    <p>Size: {item.sizes[0]}</p>
                  </div>
                  <p>Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span></p>
                  <p>Payment: <span className="text-gray-400">{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-300"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Order;
