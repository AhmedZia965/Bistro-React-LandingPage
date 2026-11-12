import Customer from "../../models/customer.js";

export const customerController = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const existingPhone = await Customer.findOne({ phone: phone });

    if (existingPhone) {
      return res.status(400).send("Phone number already registered");
    }

    const existingEmail = await Customer.findOne({ email: email });

    if (existingEmail) {
      return res.status(400).send("Email already registered");
    }

    const newCustomer = new Customer({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password,
    });

    await newCustomer.save();

    res.status(201).send("Customer added successfully");

  } catch (error) {
    res.status(500).send("Error adding customer: " + error);
  }
};