import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

// Create an order from the user's current cart (checkout), then empty the cart
export async function createOrder(req, res) {
  try {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount,
      shippingAddress,
      status: "paid", // simulated payment success for learning purposes
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
}

export async function getMyOrders(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders", error: error.message });
  }
}

export async function getOrderById(req, res) {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
}
