import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

//gloabal variables
const currency = 'inr';
const deliveryCharge = 15;

//gateway initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing orders using CASH ON DELIVERY method
/*const placeOrder = async (req,res) => {
     try {
        const {userId, items,amount,address} = req.body;

         const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod : "COD",
            payment:false,
            date:Date.now()
         }

     const newOrder = new orderModel(orderData)
     await newOrder.save()

     await userModel.findByIdAndUpdate(userId,{cartData:{}})

     res.json({success:true,message:"Order Placed"})

     } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
     }
}*/

//Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
      const { userId, items, amount, address } = req.body;
      const { origin } = req.headers;
  
      if (!Array.isArray(items) || items.length === 0) {
        throw new Error("Items must be a non-empty array.");
      }
  
      const line_items = items.map((item) => {
        if (!Array.isArray(item.price) || !Array.isArray(item.sizes)) {
          throw new Error(`Invalid price or sizes for item: ${JSON.stringify(item)}`);
        }
  
        const sizeIndex = item.sizes.indexOf(item.size);
        if (sizeIndex === -1 || typeof item.price[sizeIndex] !== "number") {
          throw new Error(`Invalid size or price for item: ${JSON.stringify(item)}`);
        }
  
        const selectedPrice = item.price[sizeIndex];
  
        return {
          price_data: {
            currency: currency,
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(selectedPrice * 100),
          },
          quantity: item.quantity,
        };
      });
  
      line_items.push({
        price_data: {
          currency: currency,
          product_data: {
            name: "Delivery Fee",
          },
          unit_amount: Math.round(deliveryCharge * 100),
        },
        quantity: 1,
      });
  
      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: "Stripe",
        payment: true,
        date: Date.now(),
      };
  
      const newOrder = new orderModel(orderData);
      await newOrder.save();
  
      const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/orders?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: "payment",
      });
  
      res.json({ success: true, session_url: session.url });
    } catch (error) {
      console.error("Error in placeOrderStripe:", error);
      res.json({ success: false, message: error.message });
    }
  };
  
  
  //verify Stripe
  const verifyStripe = async(req,res)=>{
    const{orderId,success,userId} = req.body;
     
      try {
           if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success:true,message:'Payment Successfull'})
           }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:'Payment Failed'})
           }
      } catch (error) {
           console.log(error)
           res.json({success:false,message:error.message})
      }

  }
  
//Placing orders using Razorpay Method 
const placeOrderRazor = async (req,res) => {

}

//All Orders data for Admin Panel
const allOrders = async (req,res) => {

    try {
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}

//User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
      const { userId } = req.body;

      // Fetch only paid orders and sort by latest date
      const orders = await orderModel.find({ userId }).sort({ date: -1 });

      if (!orders.length) {
          return res.json({ success: false, message: "No orders found", orders: [] });
      }

      res.json({ success: true, orders });
  } catch (error) {
      console.log("Error fetching user orders:", error);
      res.json({ success: false, message: error.message });
  }
};

//Update Order Status from Admin Panel
const updateStatus = async (req,res) => {
    try {
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true,message:'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}


export {verifyStripe,placeOrderRazor,placeOrderStripe,allOrders,userOrders,updateStatus}