import express from "express";
import {
  addOrder,
//   getOrder,
//   getOrders,
//   updateOrder,
//   deleteOrder,
} from "../controllers/orderController.js";
import {protect} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:userId").post(addOrder)
// .get(getOrders)
// router.route("/:orderId").get(getOrder).put(updateOrder).delete(deleteOrder);
export default router;
