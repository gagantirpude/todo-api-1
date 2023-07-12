import express from "express";
import {
  createTask,
  deleteTask,
  getMyTask,
  updateTask,
} from "../controllers/taskController.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

//* Create Task
router.post("/create", isAuthenticated, createTask);

//* Read All Task
router.get("/read", isAuthenticated, getMyTask);

//* Dynamic Route
router
  .route("/:id")
  //* Update
  .put(isAuthenticated, updateTask)
  //* Delete
  .delete(isAuthenticated, deleteTask);

//* Export
export default router;
