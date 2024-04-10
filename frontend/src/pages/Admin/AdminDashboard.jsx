import Chart from "react-apexcharts"; // Importing Chart component from react-apexcharts for data visualization
import {
  useGetUsersQuery, // Importing useGetUsersQuery hook from Redux API slice for fetching users
} from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery, // Importing useGetTotalOrdersQuery hook from Redux API slice for fetching total orders
  useGetTotalSalesByDateQuery, // Importing useGetTotalSalesByDateQuery hook from Redux API slice for fetching total sales by date
  useGetTotalSalesQuery, // Importing useGetTotalSalesQuery hook from Redux API slice for fetching total sales
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React for managing state and side effects
import AdminMenu from "./AdminMenu"; // Importing AdminMenu component for navigation within the admin panel
import OrderList from "./OrderList"; // Importing OrderList component for displaying a list of orders
import Loader from "../../components/Loader"; // Importing Loader component for indicating loading state

// Component for displaying the admin dashboard
const AdminDashboard = () => {
  // Fetching total sales data using the useGetTotalSalesQuery hook
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  // Fetching users data using the useGetUsersQuery hook
  const { data: customers, isLoading: loading } = useGetUsersQuery();
  // Fetching total orders data using the useGetTotalOrdersQuery hook
  const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
  // Fetching total sales by date data using the useGetTotalSalesByDateQuery hook
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  // State to manage chart options and series data
  const [state, setState] = useState({
    options: {
      chart: {
        type: "line", // Setting the chart type to line chart
      },
      tooltip: {
        theme: "dark", // Setting the tooltip theme to dark
      },
      colors: ["#00E396"], // Setting the color of the chart
      dataLabels: {
        enabled: true, // Enabling data labels
      },
      stroke: {
        curve: "smooth", // Setting the curve of the line to smooth
      },
      title: {
        text: "Sales Trend", // Setting the title of the chart
        align: "left", // Aligning the title to the left
      },
      grid: {
        borderColor: "#ccc", // Setting the border color of the grid
      },
      markers: {
        size: 1, // Setting the size of markers
      },
      xaxis: {
        categories: [], // Initializing categories for x-axis
        title: {
          text: "Date", // Setting the title of x-axis
        },
      },
      yaxis: {
        title: {
          text: "Sales", // Setting the title of y-axis
        },
        min: 0, // Setting the minimum value of y-axis
      },
      legend: {
        position: "top", // Setting the position of legend to top
        horizontalAlign: "right", // Aligning the legend to the right
        floating: true, // Making legend float
        offsetY: -25, // Setting the offset of legend on y-axis
        offsetX: -5, // Setting the offset of legend on x-axis
      },
    },
    series: [{ name: "Sales", data: [] }], // Initializing series data
  });

  // useEffect hook to update chart data when salesDetail data changes
  useEffect(() => {
    if (salesDetail) {
      // Formatting sales data
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      // Updating chart options and series data
      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },

        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]); // useEffect dependency on salesDetail

  return (
    <>
      <AdminMenu /> {/* Render AdminMenu component for navigation */}
      <section className="xl:ml-[4rem] md:ml-[0rem]">
        <div className="w-[80%] flex justify-around flex-wrap">
          {/* Sales Card */}
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Sales</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
            </h1>
          </div>

          {/* Customers Card */}
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">Customers</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : customers?.length}
            </h1>
          </div>

          {/* All Orders Card */}
          <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
            <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
              $
            </div>
            <p className="mt-5">All Orders</p>
            <h1 className="text-xl font-bold">
              $ {isLoading ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>

        {/* Chart */}
        <div className="ml-[10rem] mt-[4rem]">
          <Chart
            options={state.options}
            series={state.series}
            type="bar" // Setting the chart type to bar chart
            width="70%" // Setting the width of the chart
          />
        </div>

        {/* OrderList Component */}
        <div className="mt-[4rem]">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
