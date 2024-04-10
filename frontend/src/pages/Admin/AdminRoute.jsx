import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Component for protecting admin routes
const AdminRoute = () => {
  // Retrieve user information from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Render the nested routes if the user is an admin, otherwise redirect to the login page
  return userInfo && userInfo.isAdmin ? (
    <Outlet /> // Render nested routes
  ) : (
    <Navigate to="/login" replace /> // Redirect to the login page
  );
};

export default AdminRoute;
