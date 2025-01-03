import validator from 'validator';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';


const createToken = (id) => {
   return jwt.sign({id},process.env.JWT_SECRET
   );
}

const loginUser = async (req,res) => {
      try {
         const {email,password} = req.body;

         //check if the user exists or not
         const user = await userModel.findOne({email:email});

         if(!user){
            return res.status(200).json({success:false,message:"User not found"});
         }
          
         const isMatch = await bycrpt.compare(password,user.password);

         if(isMatch){
            const token = createToken(user._id);
            res.json({success:true,token:token});
         }
         else{
            res.status(200).json({success:false,message:"Invalid credentials"});
         }
         
      } catch (error) {
         console.log(error);
         res.json({success:false,message:error.message});
      }
}


const registerUser = async (req,res) => {
   try {
      const {name,email,password} = req.body;

      // Check if the user already exists or not
      const exists = await userModel.findOne({email:email});
      if(exists){
         return res.status(400).json({success:false,message:"User already exists"});
      }

      //validating email format and strong password
      if(!validator.isEmail(email)){
         return res.status(400).json({success:false,message:"Please enter a valid email"});
      }
      if(password.length<8){
         return res.status(400).json({success:false,message:"Password must be atleast 8 characters long"});
      }
      //hashing the password
      const salt = await bycrpt.genSalt(10);
      const hashedPassword = await bycrpt.hash(password,salt);

      //creating the user
      const newUser = new userModel({
         name,
         email,
         password:hashedPassword
      });

      //saving the user to the database
      const user = await newUser.save();
      console.log(user);
      //sending the response
      const token = createToken(user._id);
      res.status(200).json({success:true,token:token})
      
   } catch (error) {
      console.log(error);
      res.json({success:false,message:error.message})

   }
}

const adminLogin = async (req,res) => {
      try {
         const {email,password} = req.body;
         
         if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
              const token = jwt.sign(email+password,process.env.JWT_SECRET);
               res.json({success:true,token:token});
         }
         else{
            res.status(400).json({success:false,message:"Invalid credentials"});
         }

      } catch (error) {
         console.log(error);
         res.json({success:false,message:error.message});
      }
}

export {loginUser,registerUser,adminLogin};