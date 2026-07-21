import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  REMOVE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
} from "../controller/product.js";

import { Router } from "express";

const router = Router();
router.route("/").get(GET_PRODUCTS).post(ADD_PRODUCT);
router
  .route("/:id")
  .get(GET_PRODUCT)
  .delete(REMOVE_PRODUCT)
  .put(UPDATE_PRODUCT);

export default router;
