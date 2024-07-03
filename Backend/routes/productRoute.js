import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
import expressAsyncHandler from "express-async-handler";

const productRoute = express.Router();
productRoute.get("/", expressAsyncHandler(getProducts));
productRoute.get("/:id", expressAsyncHandler(getProductById));

export default productRoute;
