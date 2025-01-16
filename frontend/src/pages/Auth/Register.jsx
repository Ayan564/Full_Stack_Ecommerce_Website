import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import { Link, useLocation, useNavigate } from "react-router-dom"; // Importing Link, useLocation, and useNavigate hooks from React Router
import { useDispatch, useSelector } from "react-redux"; // Importing useDispatch and useSelector hooks from React Redux
import Loader from "../../components/Loader"; // Importing Loader component
import { useRegisterMutation } from "../../redux/api/usersApiSlice"; // Importing register mutation hook from Redux API slice
import { setCredentials } from "../../redux/features/auth/authSlice"; // Importing setCredentials action from authSlice
import { toast } from "react-toastify"; // Importing toast notification library

// Define the Register component
const Register = () => {
  // Define state variables for user input fields and loading state
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define dispatch function for Redux actions and navigate function for programmatic navigation
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use register mutation hook from Redux API slice
  const [register, { isLoading }] = useRegisterMutation();

  // Retrieve user info from Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Retrieve redirect path from query parameter in URL
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  // Effect to redirect user if already authenticated
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        // Attempt registration
        const res = await register({ username, email, password }).unwrap();
        // Dispatch setCredentials action with response data
        dispatch(setCredentials({ ...res }));
        // Redirect user to specified path after successful registration
        navigate(redirect);
        // Display success toast
        toast.success("User successfully registered");
      } catch (err) {
        // Log and display error message if registration fails
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  // Render the Register component
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>

        {/* Registration form */}
        <form onSubmit={submitHandler} className="container w-[40rem]">
          {/* Username input */}
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm password input */}
          <div className="my-[2rem]">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Loader component displayed during loading */}
          {isLoading && <Loader />}
        </form>

        {/* Login link */}
        <div className="mt-4">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Image */}
      <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
    </section>
  );
};

// Export the Register component as the default export
export default Register;
