import { Router } from "express";
import { verifyToken } from "../middleware/authenticateroutes.js";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/products.controllers.js";

export const productRouter = Router();

productRouter.post("/new", addProduct);
productRouter.get("/",  getAllProducts);
productRouter.get("/:product_id", getProductById);
productRouter.put("/:product_id/update", updateProduct);
productRouter.delete("/:product_id/delete", deleteProduct);


