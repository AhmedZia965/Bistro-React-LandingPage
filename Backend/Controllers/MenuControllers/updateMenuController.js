import Menu from "../../models/Menu.js";

export function updateMenuController(req, res) {

    const { id } = req.params;

    const { name, description, price, category, image, available } = req.body;

    Menu.findByIdAndUpdate(
        id,
        {
            name: name,
            description: description,
            price: price,
            category: category,
            image: image,
            available: available
        },
        { new: true, runValidators: true }
    )
        .then((menu) => {

            if (!menu) {
                return res.status(404).json({
                    message: "Menu item not found"
                });
            }

            res.status(200).json({
                message: "Menu item updated successfully",
                menu: menu
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error updating menu item",
                error: error.message
            });
        });
}