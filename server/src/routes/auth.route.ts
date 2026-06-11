import express from "express";
const router = express.Router();
import {
  createOperatorAccount,
  loginAdmin,
  loginOperator,
  logoutAdmin,
  logoutOperator,
  registerAdmin,
  verifyOperatorAccount,
} from "../controllers/auth.controller.js";

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/logout", logoutAdmin);

router.get("/operator/verify/:token", verifyOperatorAccount);
router.post("/operator/accept-invite", createOperatorAccount);
router.post("/operator/login", loginOperator);
router.get("/operator/logout", logoutOperator);

export default router;
