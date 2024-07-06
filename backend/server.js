// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv"; // Ensure this is at the top
// import colors from "colors";
 
 
 
 
 
 
 
 
 
 


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
 

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

// API endpoint
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))
app.use('/api/user/',userRouter)
app.use("/api/cart",cartRouter)
app.use('/api/order',orderRouter)



// Start the server
app.listen(port, () => {
  console.log(`Server Running on port ${port}`.bgCyan.white);
});



















