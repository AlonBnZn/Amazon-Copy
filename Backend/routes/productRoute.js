import express from "express";
import {
  getProducts,
  getProductById,
  getProductByToken,
  getCategories,
  getProductsByQuery,
} from "../controllers/productController.js";
import expressAsyncHandler from "express-async-handler";

const productRoute = express.Router();
productRoute.get("/", expressAsyncHandler(getProducts));
productRoute.get("/token/:token", expressAsyncHandler(getProductByToken));
productRoute.get("/categories", expressAsyncHandler(getCategories));
productRoute.get("/search", expressAsyncHandler(getProductsByQuery));
productRoute.get("/:id", expressAsyncHandler(getProductById));

export default productRoute;
