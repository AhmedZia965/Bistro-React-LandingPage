import Menu from "../../models/Menu.js";

export function deleteMenuController(req, res) {

    const { id } = req.params;

    Menu.findByIdAndDelete(id)
        .then((menu) => {

            if (!menu) {
                return res.status(404).json({
                    message: "Menu item not found"
                });
            }

            res.status(200).json({
                message: "Menu item deleted successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error deleting menu item",
                error: error.message
            });
        });
}