import Menu from "../../models/Menu.js";

export function getMenuController(req, res) {

    Menu.find()
        .then((menu) => {
            res.status(200).json({
                message: "Menu retrieved successfully",
                menu: menu
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error retrieving menu",
                error: error.message
            });
        });
}