import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"; // Importing the useGetTopProductsQuery hook from productApiSlice for fetching top products
import Message from "../../components/Message"; // Importing the Message component for displaying error messages
import Slider from "react-slick"; // Importing Slider component from react-slick for carousel functionality
import "slick-carousel/slick/slick.css"; // Importing CSS for slick carousel
import "slick-carousel/slick/slick-theme.css"; // Importing CSS theme for slick carousel
import moment from "moment"; // Importing moment library for date formatting
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa"; // Importing icons from react-icons/fa

// Functional component to render a carousel of top products
const ProductCarousel = () => {
  // Fetching top products using useGetTopProductsQuery hook
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // Settings for the carousel
  const settings = {
    dots: false, // Hiding navigation dots
    infinite: true, // Allowing infinite loop
    speed: 500, // Animation speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    arrows: true, // Showing navigation arrows
    autoplay: true, // Autoplaying slides
    autoplaySpeed: 3000, // Autoplay speed (3 seconds)
  };

  // Rendering the component
  return (
    <div className="mb-4 lg:block xl:block md:block">
      {/* Conditional rendering based on data loading and error status */}
      {isLoading ? null : error ? (
        // Displaying error message if there's an error
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        // Rendering the carousel if data is available
        <Slider
          {...settings} // Applying carousel settings
          className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block" // Adding custom styling to the carousel
        >
          {/* Mapping through products and rendering each as a slide */}
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                {/* Product image */}
                <img
                  src={image}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[30rem]" // Custom styling for the image
                />

                {/* Container for product details */}
                <div className="mt-4 flex justify-between">
                  <div className="one">
                    {/* Product name */}
                    <h2>{name}</h2>
                    {/* Product price */}
                    <p> $ {price}</p> <br /> <br />
                    {/* Truncated product description */}
                    <p className="w-[25rem]">
                      {description.substring(0, 170)} ...
                    </p>
                  </div>

                  {/* Container for additional product details */}
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      {/* Brand information */}
                      <h1 className="flex items-center mb-6">
                        <FaStore className="mr-2 text-white" /> Brand: {brand}
                      </h1>
                      {/* Product creation date */}
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 text-white" /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      {/* Number of reviews */}
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Reviews:
                        {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      {/* Product rating */}
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 text-white" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      {/* Product quantity */}
                      <h1 className="flex items-center mb-6">
                        <FaShoppingCart className="mr-2 text-white" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      {/* Product stock availability */}
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 text-white" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

// Exporting the ProductCarousel component as the default export
export default ProductCarousel;
