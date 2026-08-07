import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
// Middleware: auto-update inStock based on stock
productSchema.pre("save", function () {
  this.inStock = this.stock > 0; // true if stock > 0, false if 0
});

// Optional: also handle updates (findOneAndUpdate)
productSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();
  if (update.stock !== undefined) {
    update.inStock = update.stock > 0;
    this.setUpdate(update);
  } else if (update.$inc && update.$inc.stock !== undefined) {
    // Note: $inc doesn't give us the final stock value easily here, 
    // but at least we prevent the hook from crashing if next() was the issue.
  }
});
export default mongoose.model("Product", productSchema);
