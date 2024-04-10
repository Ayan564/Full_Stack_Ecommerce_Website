import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"; // Importing necessary functions from the Redux Toolkit query library.
import { BASE_URL } from "../constants"; // Importing the BASE_URL constant from the constants file.

// Creating a baseQuery configuration with the fetchBaseQuery function, specifying the baseUrl using the BASE_URL constant.
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// Creating an API slice using the createApi function from Redux Toolkit.
export const apiSlice = createApi({
  baseQuery, // Using the previously defined baseQuery configuration.
  tagTypes: ["Product", "Order", "User", "Category"], // Defining tag types for the API slice.
  endpoints: () => ({}), // Defining endpoints for the API slice (empty for now).
});
