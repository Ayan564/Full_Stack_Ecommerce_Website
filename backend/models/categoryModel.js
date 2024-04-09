/*
  categoryModel.js
  Description: Defines the schema for the Category model and exports the model.
*/

import mongoose from "mongoose";

// Define the schema for the Category model
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});

// Export the Category model based on the schema
export default mongoose.model("Category", categorySchema);
