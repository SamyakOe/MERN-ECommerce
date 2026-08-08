import Cart from "../models/Cart.js";

//Add items to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    //Find User's cart
    let cart = await Cart.findOne({ userId });
    //If no cart exists, create empty one
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    } 
    //If cart exists, check if product exists in cart
    const item=cart.items.find((i)=>i.productId.toString()===productId);
        
    if (item) {
      item.quantity += 1;
    } else {
      //if products does not exist, push new product
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();
    res.json({
      message: "Item added to the cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Remove item from the cart
export const removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    //Find User's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();
    res.json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Update item quantity in cart
export const updateItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    const item = cart.items.find((i) => i.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({
        message: "Item not found in the cart",
      });
    }
    item.quantity = quantity;
    await cart.save();
    res.json({
      message: "Item quantity updated",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Get user's cart
export const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

