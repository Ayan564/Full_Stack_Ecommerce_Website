import { useEffect } from "react"; // Importing the useEffect hook from React to perform side effects in function components
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Importing heart icons from react-icons/fa
import { useSelector, useDispatch } from "react-redux"; // Importing useSelector and useDispatch hooks from react-redux to access the Redux store state and dispatch actions
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice"; // Importing action creators from the favoriteSlice Redux slice
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../utils/localStorage"; // Importing helper functions to interact with local storage

// Functional component to render a heart icon and handle favorite product functionality
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions to the Redux store
  const favorites = useSelector((state) => state.favorites) || []; // Accessing the favorites array from the Redux store state
  const isFavorite = favorites.some((p) => p._id === product._id); // Checking if the current product is already a favorite

  // Effect hook to set favorites from local storage when the component mounts
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage(); // Retrieving favorites from local storage
    dispatch(setFavorites(favoritesFromLocalStorage)); // Dispatching action to set favorites in the Redux store
  }, []); // Dependency array is empty, so this effect runs only once after the component mounts

  // Function to toggle favorite status of a product
  const toggleFavorites = () => {
    if (isFavorite) {
      // If the product is already a favorite, remove it from favorites
      dispatch(removeFromFavorites(product)); // Dispatching action to remove the product from favorites in the Redux store
      removeFavoriteFromLocalStorage(product._id); // Removing the product from local storage as well
    } else {
      // If the product is not a favorite, add it to favorites
      dispatch(addToFavorites(product)); // Dispatching action to add the product to favorites in the Redux store
      addFavoriteToLocalStorage(product); // Adding the product to local storage as well
    }
  };

  // Rendering the heart icon, clicking on it toggles favorite status
  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites} // Click event handler to toggle favorite status
    >
      {/* Displaying filled heart icon if the product is a favorite, otherwise displaying outline heart icon */}
      {isFavorite ? (
        <FaHeart className="text-pink-500" /> // Filled heart icon for favorites
      ) : (
        <FaRegHeart className="text-pink-500" /> // Outline heart icon for non-favorites
      )}
    </div>
  );
};

// Exporting the HeartIcon component as the default export
export default HeartIcon;
