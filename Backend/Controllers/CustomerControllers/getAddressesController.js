
import Customer from "../../models/customer.js";

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
