// Importing mongoose for database connectivity
import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the provided URI from the environment variables
    await mongoose.connect(process.env.MONGO_URI);
    // If connection is successful, log a success message
    console.log(`Successfully connected to MongoDB 👍`);
  } catch (error) {
    // If an error occurs during connection, log the error message and exit the process with status code 1
    console.log(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

// Exporting the connectDB function for use in other modules
export default connectDB;
