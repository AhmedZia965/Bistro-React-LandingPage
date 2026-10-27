
import Customer from "../../models/customer.js";

export const addCustomerFeedbackController = (req, res) => {
  const { id } = req.params;
  const { name, category, experience, message } = req.body;

  Customer.findById(id)
    .then((customer) => {
      if (!customer) {
        return res.status(404).send("Customer not found");
      }

      customer.feedbacks.push({
        name: name,
        category: category,
        experience: experience,
        message: message
      });

      return customer.save();
    })
    .then((customer) => {
      if (customer) {
        res.status(201).json({
          message: "Feedback submitted successfully",
          feedbacks: customer.feedbacks
        });
      }
    })
    .catch((error) => {
      res.status(500).send("Error submitting feedback: " + error);
    });
};
