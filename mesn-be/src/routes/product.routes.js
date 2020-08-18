import { Router } from "express";
import { TokenValidation } from "../middlewares/verifyToken";
import multer from "../middlewares/multer";
import * as product from "../controllers/product.controller";

const router = Router();

router.use(TokenValidation);

router.route("/").get(product.getProducts).post(multer, product.createProduct);

router
  .route("/:id")
  .get(product.readProduct)
  .put(multer, product.updateProduct)
  .delete(product.deleteProduct);

export default router;
