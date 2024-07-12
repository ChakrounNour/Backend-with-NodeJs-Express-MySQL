import express from "express";
import {
  getUsers,
  deleteUser,
  updateUser,
  getUsersById,
  createUser,
} from "../controllers/Users.js";

import { verifyUser, adminOnly } from "../middleware/VerifyUser.js";
verifyUser;
const router = express.Router();

router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/users/:id", verifyUser, adminOnly, getUsersById);
router.post("/users", verifyUser, adminOnly, createUser);
router.delete("/users/:id", verifyUser, adminOnly, deleteUser);
router.patch("/users/:id", verifyUser, adminOnly, updateUser);

export default router;
