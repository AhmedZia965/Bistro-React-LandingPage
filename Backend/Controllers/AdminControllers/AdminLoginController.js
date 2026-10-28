
import Admin from "../../models/admin.js";

export async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({
            email: email.trim().toLowerCase(),
            password: password
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Admin login successful"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}
