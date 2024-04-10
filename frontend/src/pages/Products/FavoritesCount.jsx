import { useSelector } from "react-redux"; // Importing the useSelector hook from react-redux to access the Redux store state

// Functional component to display the count of favorite products
const FavoritesCount = () => {
  // Accessing the favorites array from the Redux store state using the useSelector hook
  const favorites = useSelector((state) => state.favorites);

  // Calculating the number of favorite products
  const favoriteCount = favorites.length;

  // Rendering the component
  return (
    <div className="absolute left-2 top-8">
      {/* Displaying the favorite count if there are favorite products */}
      {favoriteCount > 0 && (
        <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
          {/* Displaying the actual count */}
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

// Exporting the FavoritesCount component as the default export
export default FavoritesCount;
