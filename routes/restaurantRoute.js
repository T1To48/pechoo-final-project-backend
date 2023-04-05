import express from "express";
import {
  addRestaurant,
  restaurantLogin,
//   deleteRestaurantById,
} from "../controllers/restaurantController.js";
import { protect } from "../middlewares/restaurantAuthMiddleware.js";

const router = express.Router();



router
.route("/restaurant")
.post(addRestaurant)
.get(protect, restaurantLogin)

// router
//   .route("/restaurant/:id")
//   .delete(protect, deleteRestaurantById);

  export default router;