
import Customer from "../../models/customer.js";

export async function deleteCustomerController(req, res) {
    try {
        const { id } = req.params;

        const customer = await Customer.findByIdAndDelete(id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        res.status(200).json({
            message: "Customer account deleted successfully"
        });

    } catch (error) {
        console.log("Error deleting customer account:", error);

        res.status(500).json({
            message: "Error deleting customer account"
        });
    }
}
