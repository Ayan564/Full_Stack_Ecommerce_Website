import { useState } from "react"; // Importing useState hook from React for state management
import { useParams, Link, useNavigate } from "react-router-dom"; // Importing useParams, Link, and useNavigate from react-router-dom for routing
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from react-redux for interacting with Redux store
import { toast } from "react-toastify"; // Importing toast from react-toastify for displaying notifications
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice"; // Importing query and mutation hooks from productApiSlice for fetching product details and creating reviews
import Loader from "../../components/Loader"; // Importing Loader component for displaying loading state
import Message from "../../components/Message"; // Importing Message component for displaying error messages
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa"; // Importing icons from react-icons/fa
import moment from "moment"; // Importing moment library for date formatting
import HeartIcon from "./HeartIcon"; // Importing HeartIcon component for favorite functionality
import Ratings from "./Ratings"; // Importing Ratings component for displaying product ratings
import ProductTabs from "./ProductTabs"; // Importing ProductTabs component for displaying product details in tabs
import { addToCart } from "../../redux/features/cart/cartSlice"; // Importing addToCart action creator from cartSlice for adding products to cart

// Functional component to render product details page
const ProductDetails = () => {
  const { id: productId } = useParams(); // Extracting product ID from URL parameters
  const navigate = useNavigate(); // Initializing useNavigate for programmatic navigation
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions to Redux store

  // State variables for quantity, rating, and comment
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // Querying product details using useGetProductDetailsQuery hook
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  // Selecting user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Mutation hook for creating a review
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  // Function to handle review submission
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Calling createReview mutation to add a review for the product
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch(); // Refetching product details to update reviews
      toast.success("Review created successfully"); // Displaying success notification
    } catch (error) {
      toast.error(error?.data || error.message); // Displaying error notification
    }
  };

  // Function to handle adding product to cart
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); // Dispatching addToCart action to add product to cart
    navigate("/cart"); // Navigating to the cart page
  };

  // Rendering the component
  return (
    <>
      {/* Navigation link to go back */}
      <div>
        <Link
          to="/"
          className="text-white font-semibold hover:underline ml-[10rem]"
        >
          Go Back
        </Link>
      </div>

      {/* Conditional rendering based on loading and error states */}
      {isLoading ? (
        // Displaying loader if data is loading
        <Loader />
      ) : error ? (
        // Displaying error message if there's an error
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        // Rendering product details if data is available
        <>
          {/* Container for product details */}
          <div className="flex flex-wrap relative items-between mt-[2rem] ml-[10rem]">
            {/* Product image and favorite icon */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />

              {/* HeartIcon component for favorite functionality */}
              <HeartIcon product={product} />
            </div>

            {/* Container for product information */}
            <div className="flex flex-col justify-between">
              {/* Product name */}
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              {/* Product description */}
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              {/* Product price */}
              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>

              {/* Container for additional product details */}
              <div className="flex items-center justify-between w-[20rem]">
                {/* Container for left-side product details */}
                <div className="one">
                  {/* Brand information */}
                  <h1 className="flex items-center mb-6">
                    <FaStore className="mr-2 text-white" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  {/* Product creation date */}
                  <h1 className="flex items-center mb-6 w-[20rem]">
                    <FaClock className="mr-2 text-white" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  {/* Number of reviews */}
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>

                {/* Container for right-side product details */}
                <div className="two">
                  {/* Product rating */}
                  <h1 className="flex items-center mb-6">
                    <FaStar className="mr-2 text-white" /> Ratings: {rating}
                  </h1>
                  {/* Product quantity */}
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  {/* Product stock availability */}
                  <h1 className="flex items-center mb-6 w-[10rem]">
                    <FaBox className="mr-2 text-white" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              {/* Container for ratings and quantity selection */}
              <div className="flex justify-between flex-wrap">
                {/* Ratings component */}
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />

                {/* Quantity selection */}
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Button container for adding to cart */}
              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div>

            {/* Container for product tabs */}
            <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              {/* ProductTabs component for displaying product details in tabs */}
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Exporting the ProductDetails component as the default export
export default ProductDetails;
