import { Router } from "express";

import {
  createTeacher,
  GET_ALLTEACHERS,
  GET_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER,
} from "../controllers/teacherController.js";

import authMiddlware, {
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

import {
  createStudent,
  DELETE_STUDENT,
  GET_ALLSTUDENTS,
  GET_STUDENT,
  UPDATE_STUDENT,
} from "../controllers/studentController.js";

const router = Router();

router
  .route("/teachers")
  .get(authMiddlware, authorizeRoles("admin", "teacher"), GET_ALLTEACHERS)
  .post(authMiddlware, authorizeRoles("admin"), createTeacher);

router
  .route("/teachers/:id")
  .get(authMiddlware, authorizeRoles("admin", "teacher"), GET_TEACHER)
  .delete(authMiddlware, authorizeRoles("admin"), DELETE_TEACHER)
  .put(authMiddlware, authorizeRoles("admin"), UPDATE_TEACHER);

router
  .route("/students")
  .get(authMiddlware, authorizeRoles("admin", "teacher"), GET_ALLSTUDENTS)
  .post(authMiddlware, authorizeRoles("admin", "teacher"), createStudent);

router
  .route("/students/:id")
  .get(authMiddlware, authorizeRoles("admin", "teacher"), GET_STUDENT)
  .delete(authMiddlware, authorizeRoles("admin", "teacher"), DELETE_STUDENT)
  .put(authMiddlware, authorizeRoles("admin", "teacher"), UPDATE_STUDENT);

export default router;
