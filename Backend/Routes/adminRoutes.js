import express from "express";
import { adminLogin } from "../Controllers/AdminControllers/AdminLoginController.js";
import { getCustomerFeedback } from "../Controllers/AdminControllers/CustomerFeedbackController.js";
import { addStaff } from "../Controllers/AdminControllers/StaffpostController.js";
import { deleteStaff } from "../Controllers/AdminControllers/StaffDeleteController.js";
import { updateStaff } from "../Controllers/AdminControllers/StaffUpdateController.js";
import { getStaff } from "../Controllers/AdminControllers/getStaffController.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/feedback", getCustomerFeedback);

router.post("/staff", addStaff);
router.delete("/staff/:id", deleteStaff);
router.put("/staff/:id", updateStaff);
router.get("/staff", getStaff);

export default router;