
import express from "express";

import { customerController } from "../controllers/CustomerControllers/addCustomerController.js";
import { customerLoginController } from "../controllers/CustomerControllers/getLoginController.js";
import { getCustomerProfileController } from "../controllers/CustomerControllers/getProfileController.js.js";
import { getCustomerAddressesController } from "../controllers/CustomerControllers/getAddressesController.js";
import { saveCustomerAddressesController } from "../controllers/CustomerControllers/updateAddressesController.js.js";
import { addCustomerFeedbackController } from "../controllers/CustomerControllers/addFeedbackController.js.js";

import { updateCustomerController } from "../controllers/CustomerControllers/updateCustomerController.js";
import { deleteAddressController } from "../controllers/CustomerControllers/deleteAddressController.js";
import { deleteCustomerController } from "../controllers/CustomerControllers/deleteCustomerController.js";

const router = express.Router();

// Customer registration
router.post("/register", customerController);

// Customer login
router.post("/login", customerLoginController);

// Get customer profile
router.get("/profile/:id", getCustomerProfileController);

// Update customer profile
router.put("/profile/:id", updateCustomerController);

// Get customer's saved addresses
router.get("/addresses/:id", getCustomerAddressesController);

// Update customer's addresses
router.post("/addresses/:id", saveCustomerAddressesController);

// Delete a saved address
router.delete("/addresses/:id/:addressId", deleteAddressController);

// Delete customer account
router.delete("/account/:id", deleteCustomerController);

// Submit customer feedback
router.post("/feedback/:id", addCustomerFeedbackController);

export default router;
