
import express from "express";

import { staffLoginController } from "../controllers/StaffControllers/getStaffLoginController.js";
import { updateMenuController } from "../controllers/StaffControllers/updateMenuController.js";
import { getOrdersController } from "../controllers/StaffControllers/getOrdersController.js";

const router = express.Router();

// Staff Login
router.post("/login", staffLoginController);

// Update Menu
router.put("/menu/:id", updateMenuController);

// View Orders
router.get("/orders", getOrdersController);

export default router;
