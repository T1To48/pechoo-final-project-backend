import express from "express";
import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/user").post(register)
router.route("/user/login").post(login);

router.route("/user/:id").put(protect, updateUser).delete(protect, deleteUser);

export default router;
