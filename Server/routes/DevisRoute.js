import express from "express";

import { verifyUser, adminOnly } from "../middleware/VerifyUser.js";
import {
  createDevis,
  deleteDevis,
  getDevis,
  getDevisById,
} from "../controllers/Devis.js";

verifyUser;
const router = express.Router();

router.get("/devis", verifyUser, adminOnly, getDevis);
router.get("/devis/:id", verifyUser, adminOnly, getDevisById);
router.post("/devis", createDevis);
router.delete("/devis/:id", verifyUser, adminOnly, deleteDevis);

export default router;
