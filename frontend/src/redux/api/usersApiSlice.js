import { apiSlice } from "./apiSlice"; // Importing the apiSlice from the apiSlice file.
import { USERS_URL } from "../constants"; // Importing the USERS_URL constant from the constants file.

// Defining the usersApiSlice by injecting endpoints into the apiSlice.
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation endpoint for user login.
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`, // Endpoint URL for user login.
        method: "POST", // HTTP method: POST.
        body: data, // Request body containing login data.
      }),
    }),

    // Mutation endpoint for user logout.
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // Endpoint URL for user logout.
        method: "POST", // HTTP method: POST.
      }),
    }),

    // Mutation endpoint for user registration.
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`, // Endpoint URL for user registration.
        method: "POST", // HTTP method: POST.
        body: data, // Request body containing registration data.
      }),
    }),

    // Mutation endpoint for updating user profile.
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`, // Endpoint URL for updating user profile.
        method: "PUT", // HTTP method: PUT.
        body: data, // Request body containing profile update data.
      }),
    }),

    // Query endpoint to fetch all users.
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL, // Endpoint URL for fetching all users.
      }),
      providesTags: ["User"], // Providing tags for caching.
      keepUnusedDataFor: 5, // Keeping unused data for caching purposes.
    }),

    // Mutation endpoint for deleting a user.
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`, // Endpoint URL for deleting a user.
        method: "DELETE", // HTTP method: DELETE.
      }),
    }),

    // Query endpoint to fetch user details by ID.
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`, // Endpoint URL for fetching user details by ID.
      }),
      keepUnusedDataFor: 5, // Keeping unused data for caching purposes.
    }),

    // Mutation endpoint for updating a user.
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`, // Endpoint URL for updating a user.
        method: "PUT", // HTTP method: PUT.
        body: data, // Request body containing user update data.
      }),
      invalidatesTags: ["User"], // Invalidating cached user data.
    }),
  }),
});

// Exporting mutation and query hooks generated from usersApiSlice for use in components.
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = userApiSlice;
