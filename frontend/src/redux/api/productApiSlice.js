import { PRODUCT_URL, UPLOAD_URL } from "../constants"; // Importing the PRODUCT_URL and UPLOAD_URL constants from the constants file.
import { apiSlice } from "./apiSlice"; // Importing the apiSlice from the apiSlice file.

// Defining the productApiSlice by injecting endpoints into the apiSlice.
export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoint to fetch products based on keyword search.
    getProducts: builder.query({
      query: ({ keyword }) => ({
        url: `${PRODUCT_URL}`,
        params: { keyword },
      }),
      keepUnusedDataFor: 5, // Keeping unused data for caching purposes.
      providesTags: ["Products"], // Providing tags for caching.
    }),

    // Query endpoint to fetch a product by ID.
    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),

    // Query endpoint to fetch all products.
    allProducts: builder.query({
      query: () => `${PRODUCT_URL}/allProducts`,
    }),

    // Query endpoint to fetch product details by ID.
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5, // Keeping unused data for caching purposes.
    }),

    // Mutation endpoint to create a new product.
    createProduct: builder.mutation({
      query: (productData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"], // Invalidating cached product data.
    }),

    // Mutation endpoint to update an existing product.
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "PUT",
        body: formData,
      }),
    }),

    // Mutation endpoint to upload a product image.
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // Mutation endpoint to delete a product.
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"], // Providing tags for caching.
    }),

    // Mutation endpoint to create a review for a product.
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
    }),

    // Query endpoint to fetch top products.
    getTopProducts: builder.query({
      query: () => `${PRODUCT_URL}/top`,
      keepUnusedDataFor: 5, // Keeping unused data for caching purposes.
    }),

    // Query endpoint to fetch new products.
    getNewProducts: builder.query({
      query: () => `${PRODUCT_URL}/new`,
      keepUnusedDataFor: 5, // Keeping unused data for caching purposes.
    }),

    // Query endpoint to fetch filtered products.
    getFilteredProducts: builder.query({
      query: ({ checked, radio }) => ({
        url: `${PRODUCT_URL}/filtered-products`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

// Exporting mutation and query hooks generated from productApiSlice for use in components.
export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery,
} = productApiSlice;
