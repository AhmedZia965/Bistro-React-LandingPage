import Customer from "../../models/customer.js";

export async function getCustomerFeedback(req, res) {
    try {
        const customers = await Customer.find(
            {},
            "firstName lastName feedbacks"
        );

        res.status(200).json(customers);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}