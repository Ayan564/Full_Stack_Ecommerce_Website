// Importing necessary modules and dependencies
import Category from "../models/categoryModel.js"; // Importing the Category model
import asyncHandler from "../middlewares/asyncHandler.js"; // Importing asyncHandler middleware for handling asynchronous operations

// Controller function to create a new category
const createCategory = asyncHandler(async (req, res) => {
  try {
    // Destructuring name from request body
    const { name } = req.body;

    // Checking if name is provided
    if (!name) {
      return res.json({ error: "Name is required" }); // Returning error response if name is not provided
    }

    // Checking if category with the provided name already exists
    const existingCategory = await Category.findOne({ name });

    // If category with the same name already exists, return error response
    if (existingCategory) {
      return res.json({ error: "Already exists" });
    }

    // Creating new category instance and saving it to the database
    const category = await new Category({ name }).save();
    res.json(category); // Returning the newly created category
  } catch (error) {
    console.log(error); // Logging any errors
    return res.status(400).json(error); // Returning error response
  }
});

// Controller function to update an existing category
const updateCategory = asyncHandler(async (req, res) => {
  try {
    // Destructuring name and categoryId from request body and params respectively
    const { name } = req.body;
    const { categoryId } = req.params;

    // Finding the category by categoryId
    const category = await Category.findOne({ _id: categoryId });

    // If category not found, return error response
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Updating category name
    category.name = name;

    // Saving the updated category to the database
    const updatedCategory = await category.save();
    res.json(updatedCategory); // Returning the updated category
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(500).json({ error: "Internal server error" }); // Returning error response
  }
});

// Controller function to remove a category
const removeCategory = asyncHandler(async (req, res) => {
  try {
    // Finding and removing the category by categoryId
    const removed = await Category.findByIdAndRemove(req.params.categoryId);
    res.json(removed); // Returning the removed category
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(500).json({ error: "Internal server error" }); // Returning error response
  }
});

// Controller function to list all categories
const listCategory = asyncHandler(async (req, res) => {
  try {
    // Finding all categories
    const all = await Category.find({});
    res.json(all); // Returning all categories
  } catch (error) {
    console.log(error); // Logging any errors
    return res.status(400).json(error.message); // Returning error response
  }
});

// Controller function to read a specific category
const readCategory = asyncHandler(async (req, res) => {
  try {
    // Finding category by categoryId
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category); // Returning the category
  } catch (error) {
    console.log(error); // Logging any errors
    return res.status(400).json(error.message); // Returning error response
  }
});

// Exporting all controller functions
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
