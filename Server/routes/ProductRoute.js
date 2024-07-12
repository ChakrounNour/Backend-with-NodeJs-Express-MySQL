import express from "express";
import {
  createProducts,
  deleteProducts,
  getProducts,
  getProductsById,
  updateProducts,
} from "../controllers/Products.js";
import { verifyUser } from "../middleware/VerifyUser.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/products", verifyUser, getProducts);
router.get("/products/:id", verifyUser, getProductsById);
router.post("/products", verifyUser, upload.single("image"), createProducts);
router.patch(
  "/products/:id",
  verifyUser,
  upload.single("image"),
  updateProducts
);
router.delete("/products/:id", verifyUser, deleteProducts);

export default router;
