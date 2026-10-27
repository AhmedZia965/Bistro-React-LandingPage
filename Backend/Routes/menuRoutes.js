import express from "express";

import { addMenuController } from "../controllers/MenuControllers/addMenuController.js";
import { getMenuController } from "../controllers/MenuControllers/getMenuController.js";
import { updateMenuController } from "../controllers/MenuControllers/updateMenuController.js";
import { deleteMenuController } from "../controllers/MenuControllers/deleteMenuController.js";

const router = express.Router();

// Get all menu items
router.get("/", getMenuController);

// Add a menu item
router.post("/", addMenuController);

// Update a menu item
router.put("/:id", updateMenuController);

// Delete a menu item
router.delete("/:id", deleteMenuController);

export default router;