import express from "express";

import { verifyUser } from "../middleware/VerifyUser.js";
import {
  createBlogs,
  deleteBlogs,
  getBlogs,
  getBlogsById,
  updateBlogs,
} from "../controllers/Blog.js";
import upload from "../config/multerConfig.js";

const router = express.Router();

router.get("/blogs", verifyUser, getBlogs);
router.get("/blogs/:id", verifyUser, getBlogsById);
router.post("/blogs", verifyUser, upload.single("image"), createBlogs);
router.patch("/blogs/:id", verifyUser, upload.single("image"), updateBlogs);
router.delete("/blogs/:id", verifyUser, deleteBlogs);

export default router;
