import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const finalizeOrder = async (order) => {
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
  }
  await Cart.findOneAndUpdate(
    { userId: order.userId },
    { $pull: { items: { productId: { $in: order.items.map((i) => i.productId) } } } }
  );
};