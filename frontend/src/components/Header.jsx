import { useGetTopProductsQuery } from "../redux/api/productApiSlice"; // Importing the custom hook 'useGetTopProductsQuery' from the productApiSlice file, which is used to fetch the top products data from the Redux store.
import Loader from "./Loader"; // Importing the Loader component used to display a loading indicator while fetching data.
import SmallProduct from "../pages/Products/SmallProduct"; // Importing the SmallProduct component to display individual products.
import ProductCarousel from "../pages/Products/ProductCarousel"; // Importing the ProductCarousel component to display a carousel of products.

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery(); // Using the 'useGetTopProductsQuery' hook to fetch top products data from the Redux store. It returns 'data', 'isLoading', and 'error' states.

  if (isLoading) {
    return <Loader />; // If data is loading, display the Loader component.
  }

  if (error) {
    return <h1>ERROR</h1>; // If an error occurs while fetching data, display an error message.
  }

  return (
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2">
            {/* Mapping through the 'data' array to display each product */}
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />{" "}
                {/* Rendering the SmallProduct component for each product */}
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel /> {/* Rendering the ProductCarousel component */}
      </div>
    </>
  );
};

export default Header;
