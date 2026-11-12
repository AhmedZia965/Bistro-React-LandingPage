
import Customer from "../../models/customer.js";

export async function updateCustomerController(req, res) {
    try {
        const { id } = req.params;
        const { firstName, lastName, email, phone } = req.body;

        const customer = await Customer.findByIdAndUpdate(
            id,
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            },
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            customer: customer
        });

    } catch (error) {
        console.log("Error updating customer profile:", error);

        return res.status(500).json({
            message: "Error updating customer profile"
        });
    }
}
