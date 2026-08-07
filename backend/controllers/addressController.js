import { Mongoose } from "mongoose";
import Address from "../models/Address.js";

//To Save Address
export const saveAddress = async (req, res) => {
    try {
        const userId = req.user?.id;
        const address = await Address.create({ ...req.body, userId });
        res.json({ message: "Address saved successfully", address })
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

//To get address
export const getAddress = async (req, res) => {
    try {
        const userId = req.user?.id;
        console.log("userId", userId)

        const address = await Address.find({ userId });
        if (!address || address.length === 0) {
            return res.status(404).json({ 
                message: "Address not found",
             });
        }
        res.json(address);
    } catch (error) {
        console.error("Error fetching address:", error.message);
        res.status(500).json({ message: "Internal server error", error });
    }
}