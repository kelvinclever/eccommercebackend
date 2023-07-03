import { Router } from "express";
import { verifyToken } from "../middleware/authenticateroutes.js";
import {
  addCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getAllCustomers,
} from "../controllers/customers.controllers.js";

export const customerRouter = Router();

customerRouter.get("/",verifyToken,getAllCustomers);

// Create a new customer
customerRouter.post("/new",addCustomer);

// Get a customer by ID
customerRouter.get("/:customer_id", verifyToken,getCustomerById);

// Update a customer by ID
customerRouter.put("/:customer_id/update",updateCustomer);

// Delete a customer by ID
customerRouter.delete("/:customer_id/delete", verifyToken,deleteCustomer);
