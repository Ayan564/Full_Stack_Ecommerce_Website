import { Navigate, Outlet } from "react-router-dom"; // Importing necessary components from React Router DOM.
import { useSelector } from "react-redux"; // Importing the useSelector hook from React Redux to access the Redux store state.

// PrivateRoute Component
// This component serves as a wrapper for routes that require authentication.
// It checks whether the user is authenticated by accessing the 'userInfo' state from the Redux store.
// If the user is authenticated (userInfo exists), it renders the child routes defined inside the Outlet component.
// If the user is not authenticated, it redirects them to the login page using the Navigate component.
const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth); // Accessing 'userInfo' state from the Redux store using useSelector hook.

  // Rendering child routes if user is authenticated, otherwise redirecting to the login page
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute; // Exporting the PrivateRoute component as default.
