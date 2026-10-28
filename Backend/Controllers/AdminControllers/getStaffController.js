
import Staff from "../../models/staff.js";

// ================= GET ALL STAFF =================

export async function getStaff(req, res) {

    try {

        const staff = await Staff.find();

        res.status(200).json(staff);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch staff members"
        });

    }

}
