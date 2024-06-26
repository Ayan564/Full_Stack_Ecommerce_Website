import { createSlice } from "@reduxjs/toolkit";

// Define initial state for the authentication slice, including user info fetched from localStorage if available.
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// Create the authentication slice using createSlice from Redux Toolkit.
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer function to set user credentials and save them in localStorage.
    setCredentials: (state, action) => {
      state.userInfo = action.payload; // Update user info in state
      localStorage.setItem("userInfo", JSON.stringify(action.payload)); // Save user info in localStorage

      // Set expiration time for user session (30 days from now)
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime); // Save expiration time in localStorage
    },
    // Reducer function to clear user info and logout.
    logout: (state) => {
      state.userInfo = null; // Clear user info in state
      localStorage.clear(); // Clear all data in localStorage
    },
  },
});

// Export actions generated by the authentication slice.
export const { setCredentials, logout } = authSlice.actions;

// Export the reducer function generated by the authentication slice.
export default authSlice.reducer;
