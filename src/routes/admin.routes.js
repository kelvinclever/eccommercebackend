import { Router } from "express";
import { addadmin, adminlogin, deleteAdmin, getAlladmin, updateAdmin } from "../controllers/admin.controllers.js";
import { verifyToken } from "../middleware/authenticateroutes.js";

export const adminRouter = Router();

// Create a new admin
adminRouter.post("/new", addadmin);
adminRouter.post('/loginadmin',adminlogin)
// Delete an admin
adminRouter.delete("/:id/delete", deleteAdmin);

// Get all admin records
adminRouter.get("/", getAlladmin);

// Update an admin
adminRouter.put("/:id/update",updateAdmin);

