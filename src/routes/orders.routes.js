import { Router } from "express";
import { verifyToken } from "../middleware/authenticateroutes.js";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orders.controllers.js";

export const orderRouter = Router();

// Create a new order
orderRouter.post("/new", createOrder);

// Get all orders
orderRouter.get("/", getAllOrders);

// Get a single order by ID
orderRouter.get("/:order_id", getOrderById);

// Update an order
orderRouter.put("/:order_id", updateOrder);

// Delete an order
orderRouter.delete("/:order_id", deleteOrder);


