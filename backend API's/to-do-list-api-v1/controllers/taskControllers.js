import Task from "../models/tasks.js";

export const GET_ALL_TASKS = async (req, res) => {
  try {
    // Get userId from authenticated user (set by auth middleware)
    const userId = req.user._id;

    let tasks = await Task.find({ userId });
    res.status(200).json({
      status: "success",
      data: { tasks },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export const CREATE_TASK = async (req, res) => {
  try {
    const { title, status } = req.body;
    // Get userId from authenticated user (set by auth middleware)
    const userId = req.user._id;

    if (!title) {
      console.log("No title");
      return res
        .status(400)
        .json({ status: "fail", message: "Title must be provided" });
    }

    // Check if user already has a task with the same title
    let existingTask = await Task.findOne({ title, userId });

    if (existingTask) {
      console.log("task exists");
      return res.status(400).json({
        status: "fail",
        message: "Task already exists with same title",
      });
    }

    let task = new Task({
      title,
      status,
      userId,
    });

    await task.save();
    console.log("task saved");

    res.status(201).json({
      status: "success",
      data: { task },
      message: `${task.title} added to list`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export const UPDATE_TASK = async (req, res) => {
  try {
    const id = req.params.id;
    // Get userId from authenticated user (set by auth middleware)
    const userId = req.user._id;

    const { title, status } = req.body;
    console.log(req.body);

    if (!title && !status) {
      console.log("Title and status missing");
      return res
        .status(400)
        .json({ status: "fail", message: "Title or Status must be provided" });
    }

    // Find task and verify ownership
    let existingTask = await Task.findOne({ _id: id, userId });

    if (!existingTask) {
      console.log("Task Doesn't exists or doesn't belong to user");
      return res.status(404).json({
        status: "fail",
        message: "Task not found or you don't have permission to update it",
      });
    }

    // Update task fields
    if (title) {
      // Check if new title conflicts with another task of the same user
      const titleConflict = await Task.findOne({ 
        title, 
        userId, 
        _id: { $ne: id } 
      });
      
      if (titleConflict) {
        return res.status(400).json({
          status: "fail",
          message: "You already have a task with this title",
        });
      }
      existingTask.title = title;
    }
    
    if (status) {
      existingTask.status = status;
    }

    await existingTask.save();
    console.log("task saved");

    res.status(200).json({
      status: "success",
      data: existingTask,
      message: `${existingTask.title} Updated`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

export const DELETE_TASK = async (req, res) => {
  try {
    const deleteID = req.params.id;
    // Get userId from authenticated user (set by auth middleware)
    const userId = req.user._id;
    
    // Find task and verify ownership
    let existingTask = await Task.findOne({ _id: deleteID, userId });

    if (!existingTask) {
      console.log("task doesn't exists with the id or doesn't belong to user");
      return res.status(404).json({
        status: "fail",
        message: "Task not found or you don't have permission to delete it",
      });
    }

    await Task.findByIdAndDelete(deleteID);

    res.status(200).json({
      status: "success",
      message: `${existingTask.title} deleted from list`,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};
