import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Ensure this is at the top
import colors from "colors";
import connectDB from "./config/db.js"; // Correct import for default export

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

// Routes
app.get("/", (req, res) => {
  res.send("API is working");
});

// Start the server
app.listen(port, () => {
  console.log(
    `Server Running on port ${port}`.bgCyan.white
  );
});
