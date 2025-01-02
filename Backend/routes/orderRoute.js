import express from "express";
import {placeOrderRazor,placeOrderStripe,allOrders,userOrders,updateStatus } from "../Controllers/orderController.js";
import adminAuth from '../middleware/adminAuth.js'
import authUser from "../middleware/auth.js";

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment Features
//orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorapy',authUser,placeOrderRazor)

//User Feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter
