
import Customer from "../../models/customer.js";

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
