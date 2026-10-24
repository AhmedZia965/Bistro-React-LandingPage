
import express from "express";
import {
  customerController,
  customerLoginController,
  getCustomerProfileController,
  getCustomerAddressesController,
  saveCustomerAddressesController
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", customerController);
router.post("/login", customerLoginController);
router.get("/profile/:id", getCustomerProfileController);
router.get("/addresses/:id", getCustomerAddressesController);
router.post("/addresses/:id", saveCustomerAddressesController);

export default router;
