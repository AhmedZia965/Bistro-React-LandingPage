
import Customer from "../../models/customer.js";

export async function deleteAddressController(req, res) {
    try {
        const { id, addressId } = req.params;

        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                message: "Customer not found"
            });
        }

        const address = customer.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        customer.addresses.pull({ _id: addressId });

        await customer.save();

        res.status(200).json({
            message: "Address deleted successfully",
            addresses: customer.addresses
        });

    } catch (error) {
        console.log("Error deleting customer address:", error);

        res.status(500).json({
            message: "Error deleting customer address"
        });
    }
}
