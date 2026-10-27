export function getStaffLoginController(req, res) {

    const { email, password } = req.body;

    Staff.findOne({ email: email })
        .then((staff) => {

            if (!staff) {
                return res.status(404).json({
                    message: "Staff not found"
                });
            }

            if (staff.password !== password) {
                return res.status(401).json({
                    message: "Invalid password"
                });
            }

            res.status(200).json({
                message: "Login successful",
                staffId: staff._id,
                email: staff.email
            });

        })
        .catch((error) => {

            res.status(500).json({
                message: "Error during staff login",
                error: error.message
            });

        });
}