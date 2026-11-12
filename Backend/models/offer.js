import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    discount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Inactive"],
        required: true,
        default: "Active"
    }

});

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;