import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      region: { type: String },
      city: { type: String },
      area: { type: String },
      address: { type: String },
    },
    itemsPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
    orderId: {
      type: String,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "eSewa", "Khalti"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    transactionUuid: {
      type: String,
    },
    pidx: {
      type: String,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function () {
  if (!this.orderId) {
    console.log("Pre-save hook triggered");
    // Generate a random 6-character alphanumeric string, e.g., 'A1B2C3'
    this.orderId = Math.random().toString(36).substring(2, 8).toUpperCase();
  }
});

export default mongoose.model("Order", orderSchema);
