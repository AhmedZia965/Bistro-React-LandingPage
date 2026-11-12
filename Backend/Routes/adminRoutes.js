import express from "express";
import { adminLogin } from "../Controllers/AdminControllers/AdminLoginController.js";
import { getCustomerFeedback } from "../Controllers/AdminControllers/CustomerFeedbackController.js";
import { addStaff } from "../Controllers/AdminControllers/StaffpostController.js";
import { deleteStaff } from "../Controllers/AdminControllers/StaffDeleteController.js";
import { updateStaff } from "../Controllers/AdminControllers/StaffUpdateController.js";
import { getStaff } from "../Controllers/AdminControllers/getStaffController.js";
import { postOffer } from "../Controllers/AdminControllers/PostOfferController.js";
import { deleteOffer } from "../Controllers/AdminControllers/DeleteOfferController.js";
import { getOffers } from "../Controllers/AdminControllers/GetOfferController.js";

const router = express.Router();

// Admin login
router.post("/login", adminLogin);

// Get customer feedback
router.get("/feedback", getCustomerFeedback);

// Staff management
router.post("/staff", addStaff);
router.delete("/staff/:id", deleteStaff);
router.put("/staff/:id", updateStaff);
router.get("/staff", getStaff);

// Offer management
router.post("/offers", postOffer); // Add a new offer
router.get("/offers", getOffers); // Get all offers
router.delete("/offers/:id", deleteOffer); // Delete an offer

export default router;