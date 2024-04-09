// Function to add a product to localStorage favorites
export const addFavoriteToLocalStorage = (product) => {
  // Retrieve existing favorites from localStorage
  const favorites = getFavoritesFromLocalStorage();

  // Check if the product is not already in favorites
  if (!favorites.some((p) => p._id === product._id)) {
    // Add the product to favorites
    favorites.push(product);
    // Update localStorage with the new favorites list
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

// Function to remove a product from localStorage favorites
export const removeFavoriteFromLocalStorage = (productId) => {
  // Retrieve existing favorites from localStorage
  const favorites = getFavoritesFromLocalStorage();

  // Filter out the product with the given ID
  const updatedFavorites = favorites.filter(
    (product) => product._id !== productId
  );

  // Update localStorage with the updated favorites list
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};

// Function to retrieve favorites from localStorage
export const getFavoritesFromLocalStorage = () => {
  // Retrieve favorites JSON data from localStorage
  const favoritesJSON = localStorage.getItem("favorites");
  // Parse the JSON data into an array or return an empty array if no favorites found
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
