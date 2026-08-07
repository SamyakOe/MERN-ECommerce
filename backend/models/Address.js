import mongoose, { Mongoose } from "mongoose";
const addressSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        region: {
            type: String,

        },
        city: {
            type: String,

        },
        area: {
            type: String,
        },
        address: {
            type: String,

        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Address", addressSchema);