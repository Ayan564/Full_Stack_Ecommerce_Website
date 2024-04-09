import { Outlet } from "react-router-dom"; // Importing Outlet component from react-router-dom for rendering nested routes
import Navigation from "./pages/Auth/Navigation"; // Importing Navigation component for rendering navigation elements
import { ToastContainer } from "react-toastify"; // Importing ToastContainer component from react-toastify for displaying toast notifications
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for styling toast notifications

// App component responsible for rendering the main structure of the application
const App = () => {
  return (
    <>
      {/* Container for displaying toast notifications */}
      <ToastContainer />

      {/* Navigation component for rendering navigation elements */}
      <Navigation />

      {/* Main content area for rendering nested routes */}
      <main className="py-3">
        {/* Outlet component renders the matched child route */}
        <Outlet />
      </main>
    </>
  );
};

export default App; // Exporting App component as default
