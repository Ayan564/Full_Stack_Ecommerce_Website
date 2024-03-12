// Importing required packages/modules
import path from "path"; // Importing path module for working with file paths
import express from "express"; // Importing express framework for creating server
import dotenv from "dotenv"; // Importing dotenv for loading environment variables
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware for parsing cookies

// Importing utility functions
import connectDB from "./config/db.js"; // Importing function to connect to MongoDB database
import userRoutes from "./routes/userRoutes.js"; // Importing user routes

// Load environment variables from .env file into process.env
dotenv.config();

// Define port number, use provided PORT from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();

// Create an instance of Express application
const app = express();

// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

// Middleware to parse URL-encoded bodies of incoming requests
app.use(express.urlencoded({ extended: true }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Route middleware: Direct requests starting with "/api/users" to userRoutes
app.use("/api/users", userRoutes);

// Start the server and listen on the defined port
app.listen(port, () => console.log(`Server running on port: ${port}`));
