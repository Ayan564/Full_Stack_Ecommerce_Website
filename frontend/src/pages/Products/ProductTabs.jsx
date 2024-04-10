import { useState } from "react"; // Importing useState hook from React for state management
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom for navigation
import Ratings from "./Ratings"; // Importing Ratings component for displaying product ratings
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"; // Importing query hook from productApiSlice for fetching top products
import SmallProduct from "./SmallProduct"; // Importing SmallProduct component for displaying related products
import Loader from "../../components/Loader"; // Importing Loader component for displaying loading state

// Functional component to render product tabs with different content
const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery(); // Querying top products using useGetTopProductsQuery hook

  const [activeTab, setActiveTab] = useState(1); // State variable to track the active tab

  // Function to handle tab click event
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber); // Updating activeTab state based on the clicked tab
  };

  // Rendering the component
  return (
    <div className="flex flex-col md:flex-row">
      {/* Section for tab navigation */}
      <section className="mr-[5rem]">
        {/* Tabs for different content sections */}
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 1 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          Write Your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          Related Products
        </div>
      </section>

      {/* Section for displaying tab content */}
      <section>
        {/* Tab content for writing a review */}
        {activeTab === 1 && (
          <div className="mt-4">
            {/* Conditional rendering based on user authentication */}
            {userInfo ? (
              // Form for submitting a review
              <form onSubmit={submitHandler}>
                {/* Rating selection */}
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                {/* Comment input */}
                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              // Message prompting user to sign in if not authenticated
              <p>
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
          </div>
        )}

        {/* Tab content for displaying all reviews */}
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>No Reviews</p>}</div>
            <div>
              {/* Mapping over reviews and displaying each review */}
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  {/* Reviewer name and creation date */}
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  {/* Review comment */}
                  <p className="my-4">{review.comment}</p>
                  {/* Ratings component to display review rating */}
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tab content for displaying related products */}
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap">
            {/* Conditional rendering based on top product query loading state */}
            {!data ? (
              // Display loader if data is loading
              <Loader />
            ) : (
              // Mapping over top products and displaying each related product
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs; // Exporting the ProductTabs component
