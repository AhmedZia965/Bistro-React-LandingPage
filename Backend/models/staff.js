
import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },

    id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 15
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxlength: 254
    },

    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 12
    },

    role: {
        type: String,
        required: true,
        enum: ["Waiter", "Chef", "Cleaner"],
        default: "Waiter"
    },

    workTime: {
        type: String,
        required: true,
        enum: ["Morning", "Evening", "Night"],
        default: "Morning"
    },

    salary: {
        type: String,
        required: true,
        trim: true
    },

    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    }

});

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);

export default Staff;
