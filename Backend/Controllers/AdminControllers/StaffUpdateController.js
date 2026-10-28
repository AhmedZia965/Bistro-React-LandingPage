
import Staff from "../../models/staff.js";

export const updateStaff = async (req, res) => {
    try {
        const staff = await Staff.findOneAndUpdate(
            { id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        res.json(staff);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
