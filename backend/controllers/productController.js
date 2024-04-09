// Importing necessary modules and dependencies
import asyncHandler from "../middlewares/asyncHandler.js"; // Importing asyncHandler middleware for handling asynchronous operations
import Product from "../models/productModel.js"; // Importing the Product model

// Controller function to add a new product
const addProduct = asyncHandler(async (req, res) => {
  try {
    // Destructuring product details from request fields
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation checks for required fields
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    // Creating new product instance with provided details
    const product = new Product({ ...req.fields });

    // Saving the product to the database
    await product.save();

    res.json(product); // Returning the created product
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(400).json(error.message); // Returning error response
  }
});

// Controller function to update product details
const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    // Destructuring product details from request fields
    const { name, description, price, category, quantity, brand } = req.fields;

    // Validation checks for required fields
    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !brand:
        return res.json({ error: "Brand is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !category:
        return res.json({ error: "Category is required" });
      case !quantity:
        return res.json({ error: "Quantity is required" });
    }

    // Finding and updating the product by its ID
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save(); // Saving the updated product

    res.json(product); // Returning the updated product
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(400).json(error.message); // Returning error response
  }
});

// Controller function to remove a product
const removeProduct = asyncHandler(async (req, res) => {
  try {
    // Finding and deleting the product by its ID
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product); // Returning the deleted product
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(500).json({ error: "Server error" }); // Returning error response
  }
});

// Controller function to fetch products based on query parameters
const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6; // Number of products per page

    // Constructing search keyword based on query parameter
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    // Counting total matching products and fetching products for the current page
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    // Returning products along with pagination information
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(500).json({ error: "Server Error" }); // Returning error response
  }
});

// Controller function to fetch product by ID
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    // Finding product by its ID
    const product = await Product.findById(req.params.id);

    // If product found, return it; otherwise, return error response
    if (product) {
      return res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(404).json({ error: "Product not found" }); // Returning error response
  }
});

// Controller function to fetch all products
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    // Fetching all products, populating category information, limiting results to 12, and sorting by creation date
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createAt: -1 });

    res.json(products); // Returning all products
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(500).json({ error: "Server Error" }); // Returning error response
  }
});

// Controller function to add a review to a product
const addProductReview = asyncHandler(async (req, res) => {
  try {
    // Destructuring rating and comment from request body
    const { rating, comment } = req.body;

    // Finding the product by its ID
    const product = await Product.findById(req.params.id);

    // If product found, proceed with adding review; otherwise, return error response
    if (product) {
      // Checking if the user has already reviewed the product
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      // If user has already reviewed the product, return error response
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      // Creating review object
      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      // Adding review to the product
      product.reviews.push(review);

      // Updating number of reviews and average rating of the product
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      // Saving the updated product
      await product.save();
      res.status(201).json({ message: "Review added" }); // Returning success message
    } else {
      res.status(404);
      throw new Error("Product not found"); // If product not found, return error response
    }
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(400).json(error.message); // Returning error response
  }
});

// Controller function to fetch top-rated products
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    // Fetching top-rated products (sorted by rating) limited to 4
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products); // Returning top-rated products
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(400).json(error.message); // Returning error response
  }
});

// Controller function to fetch newest products
const fetchNewProducts = asyncHandler(async (req, res) => {
  try {
    // Fetching newest products (sorted by ID) limited to 5
    const products = await Product.find().sort({ _id: -1 }).limit(5);
    res.json(products); // Returning newest products
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(400).json(error.message); // Returning error response
  }
});

// Controller function to filter products based on category and price range
const filterProducts = asyncHandler(async (req, res) => {
  try {
    // Destructuring checked categories and price range from request body
    const { checked, radio } = req.body;

    let args = {}; // Initializing empty object to store filter arguments

    // Adding category filter if checked categories exist
    if (checked.length > 0) args.category = checked;

    // Adding price range filter if radio button selection exists
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    // Fetching products based on filter arguments
    const products = await Product.find(args);
    res.json(products); // Returning filtered products
  } catch (error) {
    console.error(error); // Logging any errors
    res.status(500).json({ error: "Server Error" }); // Returning error response
  }
});

// Exporting all controller functions
export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
};
