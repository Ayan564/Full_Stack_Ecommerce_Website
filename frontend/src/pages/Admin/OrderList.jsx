import Message from "../../components/Message"; // Importing the Message component for displaying error messages
import Loader from "../../components/Loader"; // Importing the Loader component for indicating loading state
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice"; // Importing the useGetOrdersQuery hook from Redux API slice for fetching orders
import AdminMenu from "./AdminMenu"; // Importing the AdminMenu component for navigation within the admin panel

// Component for displaying a list of orders in the admin panel
const OrderList = () => {
  // Fetching orders data using the useGetOrdersQuery hook
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {/* Conditional rendering based on loading and error states */}
      {isLoading ? ( // If loading, display the Loader component
        <Loader />
      ) : error ? ( // If error, display the Message component with the error message
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        // If neither loading nor error, display the orders table
        <table className="container mx-auto">
          <AdminMenu /> {/* Render AdminMenu component for navigation */}
          {/* Table header */}
          <thead className="w-full border">
            <tr className="mb-[5rem]">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATA</th>
              <th className="text-left pl-1">TOTAL</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Mapping through orders and rendering a row for each */}
            {orders.map((order) => (
              <tr key={order._id}>
                {/* Rendering order details */}
                <td>
                  <img
                    src={order.orderItems[0].image}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>
                <td>{order.user ? order.user.username : "N/A"}</td>
                <td>
                  {/* Displaying order creation date */}
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td>$ {order.totalPrice}</td>
                {/* Conditional rendering for paid status */}
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
                {/* Conditional rendering for delivered status */}
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
                {/* Link to view order details */}
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>More</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderList;
