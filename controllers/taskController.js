import ErrorHandler from "../middlewares/error.js";
import taskModel from "../models/taskModel.js";
import { response } from "../utils/response.js";

//* Create Task
const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await taskModel.create({
      title,
      description,
      user: req.user,
    });

    //* Response
    response(req, res, true, 201, "Task Create Successfully", req.user, next);
  } catch (error) {
    next(error);
  }
};

//* Get User Task
const getMyTask = async (req, res, next) => {
  try {
    //* const task
    const userId = req.user._id;

    //* Find UserID
    const tasks = await taskModel.find({ user: userId });

    //* Response
    response(req, res, true, 200, "My Task", tasks, next);
  } catch (error) {
    next(error);
  }
};

//* Update task
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await taskModel.findById(id);
    //condition
    if (!task) {
      return next(new ErrorHandler("Invalid Task", 404));
    }
    //condition
    task.isCompleted = !task.isCompleted;

    // Save Task
    await task.save();

    //* Response
    response(req, res, true, 200, "Task Updated", task, next);
  } catch (error) {
    next(error);
  }
};

//* Delete Task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findById(id);
    //condition
    if (!task) {
      return next(new ErrorHandler("Invalid Task", 404));
    }

    //* Delete Task
    await task.deleteOne();

    //* Response
    response(req, res, true, 200, "Task Deleted", task, next);
  } catch (error) {
    next(error);
  }
};

//* Export
export { createTask, getMyTask, deleteTask, updateTask };
