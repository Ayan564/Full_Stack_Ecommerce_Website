// Importing necessary modules from ReactDOM for rendering
import ReactDOM from "react-dom/client"; // Import createRoot from react-dom/client

// Importing the main App component and its associated CSS file
import App from "./App.jsx";
import "./index.css";

// Importing the Redux Provider and store for managing application state
import { Provider } from "react-redux";
import store from "./redux/store";

// Importing necessary modules from React Router for routing
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";

// Importing custom route components for authentication and authorization
import PrivateRoute from "./components/PrivateRoute"; // For private routes
import AdminRoute from "./pages/Admin/AdminRoute"; // For admin routes

// Importing authentication-related components
import Login from "./pages/Auth/Login.jsx"; // Login component
import Register from "./pages/Auth/Resister.jsx"; // Register component

// Importing user-related components
import Profile from "./pages/User/Profile.jsx"; // Profile component
import UserList from "./pages/Admin/UserList.jsx"; // UserList component

// Importing category-related components
import CategoryList from "./pages/Admin/CategoryList.jsx"; // CategoryList component

// Importing product-related components
import ProductList from "./pages/Admin/ProductList.jsx"; // ProductList component
import AllProducts from "./pages/Admin/AllProducts.jsx"; // AllProducts component
import ProductUpdate from "./pages/Admin/ProductUpdate.jsx"; // ProductUpdate component
import ProductDetails from "./pages/Products/ProductDetails.jsx"; // ProductDetails component

import Home from "./pages/Home.jsx";
import Favorites from "./pages/Products/Favorites.jsx";

// Importing cart-related components
import Cart from "./pages/Cart.jsx"; // Cart component

// Importing shop-related components
import Shop from "./pages/Shop.jsx"; // Shop component

// Importing order-related components
import Shipping from "./pages/Orders/Shipping.jsx"; // Shipping component
import PlaceOrder from "./pages/Orders/PlaceOrder.jsx"; // PlaceOrder component
import Order from "./pages/Orders/Order.jsx"; // Order component
import OrderList from "./pages/Admin/OrderList.jsx"; // OrderList component

// Importing PayPalScriptProvider for integrating PayPal
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Create routes using React Router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />

      {/* Protected routes (require authentication) */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin routes (require admin privileges) */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="orderlist" element={<OrderList />} />
      </Route>
    </Route>
  )
);

// Use createRoot from react-dom/client for rendering the application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Wrap the entire application with Redux Provider and PayPalScriptProvider
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
