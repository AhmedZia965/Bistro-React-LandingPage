
import Customer from "../../models/customer.js";

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
