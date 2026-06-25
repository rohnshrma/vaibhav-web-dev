import { Router } from "express";
import {
  GET_HOME,
  GET_BLOGS,
  GET_COMPOSE,
} from "../controllers/blogController.js";
import { protect } from "./authRoutes.js";

const router = Router();

router.route("/").get(GET_HOME);
router.route("/blogs").get(protect, GET_BLOGS);
router.route("/compose").get(protect, GET_COMPOSE);

export default router;
