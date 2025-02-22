import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';

// Function to create JWT Token
const createToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Token valid for 7 days
};

// Login User Function
const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;

      // Check if the user exists
      const user = await userModel.findOne({ email });
       console.log(user);
      if (!user) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
         const token = createToken(user._id);
         res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } }); // ✅ Send user details
      } else {
         return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
   } catch (error) {
      console.error("Error in loginUser:", error.message); // ✅ Debugging line
      res.status(500).json({ success: false, message: "Something went wrong" });
   }
};

// Register User Function
const registerUser = async (req, res) => {
   try {
      const { name, email, password } = req.body;

      // Check if the user already exists
      const exists = await userModel.findOne({ email });
      if (exists) {
         return res.status(400).json({ success: false, message: "User already exists" });
      }

      // Validate email format and strong password
      if (!validator.isEmail(email)) {
         return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
      if (password.length < 8) {
         return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create the user
      const newUser = new userModel({ name, email, password: hashedPassword });

      // Save the user to the database
      const user = await newUser.save();

      // Generate JWT token
      const token = createToken(user._id);

      res.status(200).json({ success: true, token });
   } catch (error) {
      console.error("Error in registerUser:", error.message); // ✅ Debugging line
      res.status(500).json({ success: false, message: error.message }); // ✅ Fixed missing status
   }
};

// Admin Login Function
const adminLogin = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" }); // ✅ Fixed
         return res.json({ success: true, token });
      } else {
         return res.status(400).json({ success: false, message: "Invalid credentials" });
      }
   } catch (error) {
      console.error("Error in adminLogin:", error.message); // ✅ Debugging line
      res.status(500).json({ success: false, message: error.message });
   }
};

// Export functions
export { loginUser, registerUser, adminLogin };
