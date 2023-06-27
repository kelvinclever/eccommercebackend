import { Router } from "express";
import { checkout } from "../controllers/checkout.controller.js";

export const checkoutRouter=Router()

checkoutRouter.post('/',checkout);