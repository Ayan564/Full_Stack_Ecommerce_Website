// Importing necessary models
import Order from "../models/orderModel.js"; // Importing the Order model
import Product from "../models/productModel.js"; // Importing the Product model

// Utility function to calculate prices for the order
function calcPrices(orderItems) {
  // Calculating total price of all items in the order
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Setting shipping price based on total price of items
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Tax rate
  const taxRate = 0.15;

  // Calculating tax price
  const taxPrice = (itemsPrice * taxRate).toFixed(2);

  // Calculating total price including items price, shipping price, and tax price
  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);

  // Returning prices as an object
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

// Controller function to create a new order
const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    // Checking if order items are provided
    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    // Fetching products from the database based on order item IDs
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // Mapping order items from client to items from database and calculating prices
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      // If product not found in database, return error response
      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not found: ${itemFromClient._id}`);
      }

      // Creating order item for database with product details
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });

    // Calculating prices for the order
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    // Creating new order instance
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    // Saving the order to the database
    const createdOrder = await order.save();
    res.status(201).json(createdOrder); // Returning the created order
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to get all orders
const getAllOrders = async (req, res) => {
  try {
    // Finding all orders and populating user information
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders); // Returning all orders
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to get orders of a specific user
const getUserOrders = async (req, res) => {
  try {
    // Finding orders of the logged-in user
    const orders = await Order.find({ user: req.user._id });
    res.json(orders); // Returning user's orders
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to count total number of orders
const countTotalOrders = async (req, res) => {
  try {
    // Counting total number of orders
    const totalOrders = await Order.countDocuments();
    res.json({ totalOrders }); // Returning total number of orders
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to calculate total sales
const calculateTotalSales = async (req, res) => {
  try {
    // Finding all orders
    const orders = await Order.find();
    // Calculating total sales by summing up total price of all orders
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json({ totalSales }); // Returning total sales
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to calculate total sales by date
const calculateTotalSalesByDate = async (req, res) => {
  try {
    // Aggregating orders to calculate total sales grouped by paid date
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);

    res.json(salesByDate); // Returning total sales by date
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to find an order by ID
const findOrderById = async (req, res) => {
  try {
    // Finding order by its ID and populating user information
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );

    // If order not found, return error response
    if (order) {
      res.json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to mark an order as paid
const markOrderAsPaid = async (req, res) => {
  try {
    // Finding order by its ID
    const order = await Order.findById(req.params.id);

    // If order found, updating its payment status and details
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      // Saving the updated order
      const updateOrder = await order.save();
      res.status(200).json(updateOrder); // Returning the updated order
    } else {
      res.status(404);
      throw new Error("Order not found"); // If order not found, return error response
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Controller function to mark an order as delivered
const markOrderAsDelivered = async (req, res) => {
  try {
    // Finding order by its ID
    const order = await Order.findById(req.params.id);

    // If order found, updating its delivery status
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      // Saving the updated order
      const updatedOrder = await order.save();
      res.json(updatedOrder); // Returning the updated order
    } else {
      res.status(404);
      throw new Error("Order not found"); // If order not found, return error response
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handling errors
  }
};

// Exporting all controller functions
export {
  createOrder,
  getAllOrders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};
