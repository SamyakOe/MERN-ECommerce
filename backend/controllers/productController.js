import Product from "../models/Product.js";

//Create new product
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Get all Products
export const getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Update product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({
      message: "Product updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
