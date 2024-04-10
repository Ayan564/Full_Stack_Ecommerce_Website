import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import { AiOutlineShoppingCart } from "react-icons/ai"; // Importing shopping cart icon from react-icons/ai
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux to dispatch actions to the Redux store
import { addToCart } from "../../redux/features/cart/cartSlice"; // Importing addToCart action creator from cartSlice Redux slice
import { toast } from "react-toastify"; // Importing toast from react-toastify for displaying notifications
import HeartIcon from "./HeartIcon"; // Importing HeartIcon component to handle favorite functionality

// Functional component to render a product card
const ProductCard = ({ p }) => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions to the Redux store

  // Function to add a product to the cart
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty })); // Dispatching action to add the product to the cart in the Redux store
    // Displaying a success notification
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT, // Notification position
      autoClose: 2000, // Auto close after 2000 milliseconds (2 seconds)
    });
  };

  // Rendering the product card
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {/* Section for the product image and brand */}
      <section className="relative">
        {/* Link to navigate to the product details page */}
        <Link to={`/product/${p._id}`}>
          {/* Brand tag */}
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p?.brand}
          </span>
          {/* Product image */}
          <img
            className="cursor-pointer w-full"
            src={p.image}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
        </Link>
        {/* Heart icon for favorite functionality */}
        <HeartIcon product={p} />
      </section>

      {/* Container for product details */}
      <div className="p-5">
        <div className="flex justify-between">
          {/* Product name */}
          <h5 className="mb-2 text-xl text-whiet dark:text-white">{p?.name}</h5>

          {/* Product price */}
          <p className=" font-semibold text-pink-500">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        {/* Product description */}
        <p className="mb-3 font-normal text-[#CFCFCF]">
          {p?.description?.substring(0, 60)} ...
        </p>

        {/* Container for 'Read More' link and 'Add to Cart' button */}
        <section className="flex justify-between items-center">
          {/* 'Read More' link */}
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            {/* Arrow icon */}
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          {/* 'Add to Cart' button */}
          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler(p, 1)} // Click event handler to add the product to the cart
          >
            <AiOutlineShoppingCart size={25} /> {/* Shopping cart icon */}
          </button>
        </section>
      </div>
    </div>
  );
};

// Exporting the ProductCard component as the default export
export default ProductCard;
