
import Customer from "../../models/customer.js";

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
