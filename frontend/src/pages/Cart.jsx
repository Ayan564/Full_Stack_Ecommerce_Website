import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

// Cart component for displaying cart items and handling cart operations
const Cart = () => {
  // Hooks
  const navigate = useNavigate(); // Navigation hook for redirecting
  const dispatch = useDispatch(); // Redux dispatch hook

  // Select cart state from Redux store
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart; // Destructure cart items from cart state

  // Handler to add product to cart
  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty })); // Dispatch action to add item to cart
  };

  // Handler to remove product from cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id)); // Dispatch action to remove item from cart
  };

  // Handler for proceeding to checkout
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping"); // Redirect to login page with shipping as redirect path
  };

  return (
    <>
      <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
        {/* Conditionally render cart items or empty cart message */}
        {cartItems.length === 0 ? (
          <div>
            Your cart is empty <Link to="/shop">Go To Shop</Link>
          </div>
        ) : (
          <>
            {/* Display cart items */}
            <div className="flex flex-col w-[80%]">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

              {/* Map through cart items and render each item */}
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-enter mb-[1rem] pb-2">
                  <div className="w-[5rem] h-[5rem]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 ml-4">
                    {/* Link to product details */}
                    <Link to={`/product/${item._id}`} className="text-pink-500">
                      {item.name}
                    </Link>

                    <div className="mt-2 text-white">{item.brand}</div>
                    <div className="mt-2 text-white font-bold">
                      $ {item.price}
                    </div>
                  </div>

                  {/* Select input for quantity */}
                  <div>
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {/* Generate options for quantity selection */}
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Button to remove item from cart */}
                  <div>
                    <button
                      className="text-red-500 mr-[5rem]"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-[1rem] mt-[.5rem]" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Cart summary */}
              <div className="mt-8 w-[40rem]">
                <div className="p-4 rounded-lg">
                  <h2 className="text-xl font-semibold mb-2">
                    Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  {/* Total price */}
                  <div className="text-2xl font-bold">
                    ${" "}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </div>

                  {/* Checkout button */}
                  <button
                    className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
