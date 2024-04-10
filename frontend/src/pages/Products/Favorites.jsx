import { useSelector } from "react-redux"; // Importing the useSelector hook from react-redux to access the Redux store state
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice"; // Importing the selector function to retrieve favorite products from the Redux store
import Product from "./Product"; // Importing the Product component to display each favorite product

// Functional component to display favorite products
const Favorites = () => {
  // Accessing the favorite products from the Redux store state using the useSelector hook
  const favorites = useSelector(selectFavoriteProduct);

  // Rendering the component
  return (
    <div className="ml-[10rem]">
      {/* Heading to indicate favorite products */}
      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      {/* Displaying favorite products */}
      <div className="flex flex-wrap">
        {/* Mapping through the favorite products array and rendering each product using the Product component */}
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

// Exporting the Favorites component as the default export
export default Favorites;
