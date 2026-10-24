
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  rewardPoints: { type: Number, default: 0 },

  addresses: [
    {
      label: { type: String, enum: ["Home", "Work", "Other"], required: true },
      city: { type: String, required: true },
      area: { type: String, required: true },
      street: { type: String, required: true },
      building: { type: String, required: true },
      apartment: { type: String, default: "" },
      phone: { type: String, required: true },
      notes: { type: String, default: "" },
      isDefault: { type: Boolean, default: false }
    }
  ]
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
