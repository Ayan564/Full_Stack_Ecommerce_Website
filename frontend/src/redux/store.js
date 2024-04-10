import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice"; // Import API slice
import authReducer from "./features/auth/authSlice"; // Import auth reducer
import favoritesReducer from "../redux/features/favorites/favoriteSlice"; // Import favorites reducer
import cartSliceReducer from "../redux/features/cart/cartSlice"; // Import cart reducer
import shopReducer from "../redux/features/shop/shopSlice"; // Import shop reducer
import { getFavoritesFromLocalStorage } from "../utils/localStorage"; // Import function to retrieve favorites from local storage

// Retrieve favorites from local storage or use an empty array if not found
const initialFavorites = getFavoritesFromLocalStorage() || [];

// Configure Redux store
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // Add API slice reducer
    auth: authReducer, // Add auth reducer
    favorites: favoritesReducer, // Add favorites reducer
    cart: cartSliceReducer, // Add cart reducer
    shop: shopReducer, // Add shop reducer
  },
  preloadedState: {
    favorites: initialFavorites, // Initialize favorites state with retrieved values
  },
  // Add API middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools
});

// Setup listeners for the API middleware
setupListeners(store.dispatch);

// Export the configured store
export default store;
