import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

//Get Stats for Dashboard
export const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalRevenue = await Order.aggregate([
            {
                $match: { status: "Delivered" }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$totalPrice" }
                }
            }
        ])
        res.json({
            totalOrders,
            totalProducts,
            totalUsers,
            totalRevenue: totalRevenue[0]?.total || 0,
        })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

//Get 5 Recent Orders for Dashboard
export const getRecentOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 }).limit(5).populate("userId", "name ");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

//Get low stocks
export const getLowStocks = async (req, res)=>{
    try {
        const products = await Product.find({stock: {$lt: 10}}).sort({stock: 1});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}