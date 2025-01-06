import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

// Home component for displaying special products and handling search results
const Home = () => {
  // Get the keyword parameter from the URL
  const { keyword } = useParams();

  // Fetch products based on the keyword using an API query
  const { data, isLoading, isError, error } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* Render header only if there is no keyword (i.e., not in search mode) */}
      {!keyword ? <Header /> : null}

      {/* Conditional rendering based on loading and error states */}
      {isLoading ? (
        // Display a loader while data is being fetched
        <Loader />
      ) : isError ? (
        // Display an error message if there's an error fetching data
        <Message variant="danger">
          {error?.data?.message ||
            error?.error ||
            "An unexpected error occurred"}
        </Message>
      ) : (
        // Render the special products if data is successfully fetched
        <>
          {/* Title and shop link */}
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
              Special Products
            </h1>
            <Link
              to="/shop"
              className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]"
            >
              Shop
            </Link>
          </div>

          {/* Render product cards */}
          <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
              {/* Map through products and render each product card */}
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
