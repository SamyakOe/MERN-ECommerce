import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // Validate shipping address
    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.phone) {
      return res
        .status(400)
        .json({ message: "Shipping address with fullName and phone is required" });
    }

    // Fetch product details from DB to prevent price tampering
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res
        .status(400)
        .json({ message: "One or more products not found" });
    }

    // Build order items with server-side prices
    const orderItems = items.map((item) => {
      const product = products.find(
        (p) => p._id.toString() === item.productId
      );
      return {
        productId: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        quantity: item.quantity,
      };
    });

    // Calculate totals server-side
    const itemsPrice = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const taxPrice = Math.round(itemsPrice * 0.13 * 100) / 100; // 13% tax
    const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100;

    //COD
    if (paymentMethod === "COD") {
      // Create the order
      const order = await Order.create({
        userId,
        items: orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        totalPrice,
        paymentMethod: "COD",
        paymentStatus: "Pending",
        transactionUuid: `ORDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      });

      // Decrement product stock
      for (const item of orderItems) {
        await Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stock: -item.quantity } },
          { new: true }
        );
      }

      // Remove ordered items from the user's cart
      const cart = await Cart.findOne({ userId });
      if (cart) {
        cart.items = cart.items.filter(
          (cartItem) =>
            !productIds.includes(cartItem.productId.toString())
        );
        await cart.save();
      }

      res.status(201).json({ message: "Order placed successfully", order });
    } else {
      //eSewa or khalti
      // Create the order
      const order = await Order.create({
        userId,
        items: orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        totalPrice,
        paymentMethod: paymentMethod,
        paymentStatus: "Pending",
        transactionUuid: `ORDER-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
      });
      res.status(201).json({ message: "Order placed successfully", order });

    }
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Get all orders for the logged-in user
export const getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

// Get a single order by ID (only if it belongs to the user)
export const getOrderById = async (req, res) => {
  try {
    const userId = req.user.id;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");

    if (!orders) {
      return res.status(404).json({ message: "No Orders found" });
    }

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Update order Status
export const updateStatus = async (req, res) => {
  try {

    const status = req.body.status;
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order })
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });

  }
}