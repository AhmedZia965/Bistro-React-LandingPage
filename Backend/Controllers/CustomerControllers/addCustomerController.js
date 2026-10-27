
import Customer from "../../models/customer.js";

export const customerController = (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  const newCustomer = new Customer({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    password: password,
  });

  newCustomer.save()
    .then(() => res.status(201).send("Customer added successfully"))
    .catch((error) => res.status(500).send("Error adding customer: " + error));
};
