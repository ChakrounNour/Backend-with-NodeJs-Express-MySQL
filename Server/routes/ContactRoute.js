import express from "express";

import { verifyUser, adminOnly } from "../middleware/VerifyUser.js";
import {
  createContact,
  deleteContact,
  getContact,
  getContactById,
} from "../controllers/Contact.js";
verifyUser;
const router = express.Router();

router.get("/contact", verifyUser, adminOnly, getContact);
router.get("/contact/:id", verifyUser, adminOnly, getContactById);
router.post("/contact", createContact);
router.delete("/contact/:id", verifyUser, adminOnly, deleteContact);

export default router;
