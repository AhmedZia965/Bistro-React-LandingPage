import Staff from "../../models/staff.js";

export const addStaff = async (req, res) => {
    try {
        const staff = await Staff.create(req.body);
        res.status(201).json(staff);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "This Staff ID already exists" });
        }
        res.status(500).json({ message: error.message });
    }
};