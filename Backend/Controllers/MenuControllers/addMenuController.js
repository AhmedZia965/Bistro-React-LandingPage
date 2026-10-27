import Menu from "../../models/Menu.js";

export function addMenuController(req, res) {

    const { name, description, price, category, image, available } = req.body;

    const menu = new Menu({
        name: name,
        description: description,
        price: price,
        category: category,
        image: image,
        available: available
    });

    menu.save()
        .then((savedMenu) => {
            res.status(201).json({
                message: "Menu item added successfully",
                menu: savedMenu
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Error adding menu item",
                error: error.message
            });
        });
}