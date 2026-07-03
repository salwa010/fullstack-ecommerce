import Cart from "../models/Cart.js";

async function getOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
}

export async function getCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart", error: error.message });
  }
}

export async function addToCart(req, res) {
  try {
    const { productId, title, price, thumbnail, quantity = 1 } = req.body;
    if (!productId || !title || price === undefined) {
      return res.status(400).json({ message: "productId, title and price are required" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, title, price, thumbnail, quantity });
    }

    await cart.save();
    res.status(201).json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to add item to cart", error: error.message });
  }
}

export async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((item) => item.productId === Number(productId));
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart item", error: error.message });
  }
}

export async function removeCartItem(req, res) {
  try {
    const { productId } = req.params;
    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((item) => item.productId !== Number(productId));
    await cart.save();
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove cart item", error: error.message });
  }
}

export async function clearCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    cart.items = [];
    await cart.save();
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear cart", error: error.message });
  }
}
