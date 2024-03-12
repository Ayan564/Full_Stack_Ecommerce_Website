// Importing mongoose for schema and model creation
import mongoose from "mongoose";

// Define user schema using mongoose.Schema
const userSchema = mongoose.Schema(
  {
    // Define username field with type String and required
    username: { type: String, required: true },
    // Define email field with type String, required, and unique
    email: { type: String, required: true, unique: true },
    // Define password field with type String and required
    password: { type: String, required: true },
    // Define isAdmin field with type Boolean, required, and default value of false
    isAdmin: { type: Boolean, required: true, default: false },
  },
  // Add timestamps option to automatically add createdAt and updatedAt fields
  { timestamps: true }
);

// Create User model based on the userSchema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other modules
export default User;
