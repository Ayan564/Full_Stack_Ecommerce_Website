import { apiSlice } from "./apiSlice"; // Importing the apiSlice from the apiSlice file.
import { CATEGORY_URL } from "../constants"; // Importing the CATEGORY_URL constant from the constants file.

// Defining the categoryApiSlice by injecting endpoints into the apiSlice.
export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation endpoint to create a new category.
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: `${CATEGORY_URL}`, // Endpoint URL for creating a category.
        method: "POST", // HTTP method: POST.
        body: newCategory, // Request body containing the new category data.
      }),
    }),

    // Mutation endpoint to update an existing category.
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`, // Endpoint URL for updating a category.
        method: "PUT", // HTTP method: PUT.
        body: updatedCategory, // Request body containing the updated category data.
      }),
    }),

    // Mutation endpoint to delete a category.
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`, // Endpoint URL for deleting a category.
        method: "DELETE", // HTTP method: DELETE.
      }),
    }),

    // Query endpoint to fetch all categories.
    fetchCategories: builder.query({
      query: () => `${CATEGORY_URL}/categories`, // Endpoint URL for fetching all categories.
    }),
  }),
});

// Exporting mutation and query hooks generated from categoryApiSlice for use in components.
export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} = categoryApiSlice;
