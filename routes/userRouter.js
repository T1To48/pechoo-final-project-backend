import express from "express";
import { 
  register, 
  login, 
  // deleteUser
 } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/user").post(register).get(protect, login);

// router.route("/user/:id").delete(protect, deleteUser);

export default router;
