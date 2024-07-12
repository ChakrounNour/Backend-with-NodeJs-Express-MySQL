import express from "express";
import { refreshToken } from "../controllers/RefreshToken.js";
import { Login, Logout, Me } from "../controllers/Auth.js";

const router = express.Router();

router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/token", refreshToken);
export default router;
