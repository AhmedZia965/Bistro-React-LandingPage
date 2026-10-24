
import Customer from "../models/customer.js";

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

export const customerLoginController = (req, res) => {
  const { phone, password } = req.body;

  Customer.findOne({ phone: phone, password: password })
    .then((customer) => {
      if (customer) {
        res.status(200).json({
          message: "Login successful",
          customerId: customer._id
        });
      } else {
        res.status(401).send("Invalid phone number or password");
      }
    })
    .catch((error) => {
      res.status(500).send("Error logging in: " + error);
    });
};

export const getCustomerProfileController = (req, res) => {
  const { id } = req.params;

  Customer.findById(id)
    .then((customer) => {
      if (customer) {
        res.status(200).json({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          rewardPoints: customer.rewardPoints || 0
        });
      } else {
        res.status(404).send("Customer not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving customer profile: " + error);
    });
};

export const getCustomerAddressesController = (req, res) => {
  const { id } = req.params;

  Customer.findById(id)
    .then((customer) => {
      if (customer) {
        res.status(200).json(customer.addresses || []);
      } else {
        res.status(404).send("Customer not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving addresses: " + error);
    });
};

export const saveCustomerAddressesController = (req, res) => {
  const { id } = req.params;
  const { addresses } = req.body;

  Customer.findById(id)
    .then((customer) => {
      if (!customer) {
        return res.status(404).send("Customer not found");
      }

      customer.addresses = addresses;

      return customer.save();
    })
    .then((customer) => {
      if (customer) {
        res.status(200).json({
          message: "Addresses saved successfully",
          addresses: customer.addresses
        });
      }
    })
    .catch((error) => {
      res.status(500).send("Error saving addresses: " + error);
    });
};
