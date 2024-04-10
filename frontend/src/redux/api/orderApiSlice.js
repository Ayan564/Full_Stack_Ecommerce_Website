import { apiSlice } from "./apiSlice"; // Importing the apiSlice from the apiSlice file.
import { ORDERS_URL, PAYPAL_URL } from "../constants"; // Importing the ORDERS_URL and PAYPAL_URL constants from the constants file.

// Defining the orderApiSlice by injecting endpoints into the apiSlice.
export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation endpoint to create a new order.
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL, // Endpoint URL for creating an order.
        method: "POST", // HTTP method: POST.
        body: order, // Request body containing the new order data.
      }),
    }),

    // Query endpoint to get order details by ID.
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`, // Endpoint URL for getting order details by ID.
      }),
    }),

    // Mutation endpoint to pay for an order.
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`, // Endpoint URL for paying an order.
        method: "PUT", // HTTP method: PUT.
        body: details, // Request body containing payment details.
      }),
    }),

    // Query endpoint to get PayPal client ID.
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL, // Endpoint URL for getting PayPal client ID.
      }),
    }),

    // Query endpoint to get the current user's orders.
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`, // Endpoint URL for getting current user's orders.
      }),
      keepUnusedDataFor: 5, // Keep unused data for caching purposes.
    }),

    // Query endpoint to get all orders.
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL, // Endpoint URL for getting all orders.
      }),
    }),

    // Mutation endpoint to mark an order as delivered.
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`, // Endpoint URL for marking an order as delivered.
        method: "PUT", // HTTP method: PUT.
      }),
    }),

    // Query endpoint to get the total number of orders.
    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`, // Endpoint URL for getting total number of orders.
    }),

    // Query endpoint to get the total sales.
    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`, // Endpoint URL for getting total sales.
    }),

    // Query endpoint to get the total sales by date.
    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`, // Endpoint URL for getting total sales by date.
    }),
  }),
});

// Exporting mutation and query hooks generated from orderApiSlice for use in components.
export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetOrdersQuery,
} = orderApiSlice;
