import { Router } from "express";
import {
  GET_ALL_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../controllers/taskControllers.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Protect all task routes with authentication middleware
router.route("/").get(authenticateToken, GET_ALL_TASKS).post(authenticateToken, CREATE_TASK);
router.route("/:id").delete(authenticateToken, DELETE_TASK).put(authenticateToken, UPDATE_TASK);

export default router;
