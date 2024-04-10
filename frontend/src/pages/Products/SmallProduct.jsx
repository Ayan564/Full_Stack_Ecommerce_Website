import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import HeartIcon from "./HeartIcon"; // Importing HeartIcon component to handle favorite product functionality

// Component for displaying a small product card
const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative">
        {/* Displaying product image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        {/* Rendering HeartIcon component for handling favorite product */}
        <HeartIcon product={product} />
      </div>

      <div className="p-4">
        {/* Link to navigate to product details page */}
        <Link to={`/product/${product._id}`}>
          <h2 className="flex justify-between items-center">
            {/* Displaying product name */}
            <div>{product.name}</div>
            {/* Displaying product price */}
            <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct; // Exporting the SmallProduct component as the default export
