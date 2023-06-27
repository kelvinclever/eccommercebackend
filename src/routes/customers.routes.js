import { Router } from "express";
import { verifyToken } from "../middleware/authenticateroutes.js";
import {
  addCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customers.controllers.js";

export const customerRouter = Router();

// Create a new customer
customerRouter.post("/new", addCustomer);

// Get a customer by ID
customerRouter.get("/:customer_id", getCustomerById);

// Update a customer by ID
customerRouter.put("/:customer_id", updateCustomer);

// Delete a customer by ID
customerRouter.delete("/:customer_id", deleteCustomer);
