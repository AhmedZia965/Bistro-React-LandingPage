
import express from "express";

import { getStaffLoginController } from "../Controllers/StaffControllers/getStaffLoginController.js";
import { updateMenuController } from "../Controllers/MenuControllers/updateMenuController.js";

const router = express.Router();

// Staff Login
router.get("/login", getStaffLoginController);

// Update Menu
router.put("/menu/:id", updateMenuController);


export default router;
