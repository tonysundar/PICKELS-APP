import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mangodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import ProductRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

 
//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//Middlewares
app.use(express.json());
app.use(cors({origin:"*"}));

//API endpoints
app.use('/api/user',userRouter);
app.use('/api/product',ProductRouter);
app.use('/api/cart',cartRouter);





app.listen(port,()=>{console.log("server is up and running...at port");}) 