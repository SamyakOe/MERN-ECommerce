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
    const { search, category, limit, page } = req.query;
    let filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    const pageNum = parseInt(page) 
    const limitNum = parseInt(limit) 
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.json({ products, total, page: pageNum, limit: limitNum });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//Update product
export const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.id
    const updated = await Product.findByIdAndUpdate(product_id, req.body, {
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
