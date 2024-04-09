// Importing required packages/modules
import path from "path"; // Importing path module for working with file paths
import express from "express"; // Importing express framework for creating server
import dotenv from "dotenv"; // Importing dotenv for loading environment variables
import cookieParser from "cookie-parser"; // Importing cookie-parser middleware for parsing cookies

// Importing utility functions
import connectDB from "./config/db.js"; // Importing function to connect to MongoDB database
import userRoutes from "./routes/userRoutes.js"; // Importing user routes
import categoryRoutes from "./routes/categoryRoutes.js"; // Importing category routes
import productRoutes from "./routes/productRoutes.js"; // Importing product routes
import uploadRoutes from "./routes/uploadRoutes.js"; // Importing upload routes
import orderRoutes from "./routes/orderRoutes.js"; // Importing order routes

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

// Route middleware: Direct requests starting with "/api/category" to categoryRoutes
app.use("/api/category", categoryRoutes);

// Route middleware: Direct requests starting with "/api/products" to productRoutes
app.use("/api/products", productRoutes);

// Route middleware: Direct requests starting with "/api/upload" to uploadRoutes
app.use("/api/upload", uploadRoutes);

// Route middleware: Direct requests starting with "/api/orders" to orderRoutes
app.use("/api/orders", orderRoutes);

// Route for fetching PayPal configuration
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Serve uploaded images statically from the "uploads" directory
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Start the server and listen on the defined port
app.listen(port, () => console.log(`Server running on port: ${port}`));
