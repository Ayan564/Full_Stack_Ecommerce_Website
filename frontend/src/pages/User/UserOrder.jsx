import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";

// UserOrder component for displaying user's order history
const UserOrder = () => {
  // Fetch user's orders using the API query
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="container mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

      {/* Conditional rendering based on loading and error states */}
      {isLoading ? (
        // Display loader while data is being fetched
        <Loader />
      ) : error ? (
        // Display error message if there's an error fetching data
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        // Render orders table if data is successfully fetched
        <table className="w-full">
          <thead>
            {/* Table header */}
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2"></td>
            </tr>
          </thead>

          <tbody>
            {/* Map through orders and render each order row */}
            {orders.map((order) => (
              <tr key={order._id}>
                {/* Order image */}
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] mb-5"
                />

                {/* Order details */}
                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">$ {order.totalPrice}</td>

                {/* Order payment status */}
                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                {/* Order delivery status */}
                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                {/* View order details button */}
                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-pink-400 text-back py-2 px-3 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;
