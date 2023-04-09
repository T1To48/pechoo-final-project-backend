import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  addOrder,
  getOrder,
  advancedGetOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import {
  updateOrderAccepted,
  updateOrderReady,
} from "../controllers/orderStatusController.js";


const router = express.Router();

router.route("/:userId").post(protect,addOrder).get(protect,advancedGetOrders);
router.route("/:orderId").get(protect,getOrder).put(protect,updateOrder).delete(protect,deleteOrder);
router.put("/ready/:orderId",protect, updateOrderReady);
router.put("/:driverId/accepted/:orderId", protect,updateOrderAccepted);

export default router;
