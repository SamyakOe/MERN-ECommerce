import User from "../models/User.js";

//Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });

    }
}
//Get user by ID
export const getUser = async (req, res) => {
    try {
        const _id = req.user?.id;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}