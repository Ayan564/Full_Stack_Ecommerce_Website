import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import HeartIcon from "./HeartIcon"; // Importing HeartIcon component to handle favorite functionality

// Functional component to display a single product
const Product = ({ product }) => {
  // Rendering the component
  return (
    <div className="w-[30rem] ml-[2rem] p-3 relative">
      {/* Container for the product image and heart icon */}
      <div className="relative">
        {/* Product image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded"
        />
        {/* Heart icon for favorite functionality */}
        <HeartIcon product={product} />
      </div>

      {/* Container for product details */}
      <div className="p-4">
        {/* Link to navigate to product details page */}
        <Link to={`/product/${product._id}`}>
          {/* Product name and price */}
          <h2 className="flex justify-between items-center">
            {/* Product name */}
            <div className="text-lg">{product.name}</div>
            {/* Product price */}
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              $ {product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

// Exporting the Product component as the default export
export default Product;
