import Staff from "../../models/staff.js";

export const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findOneAndDelete({ id: req.params.id });

        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }

        res.json({ message: "Staff removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};