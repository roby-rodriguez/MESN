import { Router } from "express";
import { TokenValidation } from "../middlewares/verifyToken";
import {
  getOrders,
  createOrder,
  readOrder,
} from "../controllers/order.controller";

const router = Router();

router.use(TokenValidation);

router.route("/").get(getOrders).post(createOrder);

router.route("/:id").get(readOrder);

export default router;
