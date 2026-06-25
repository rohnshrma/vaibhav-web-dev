import Teacher from "../models/teacher.js";

export const createTeacher = async (req, res) => {
  try {
    const { name, email, subject, experienceYears } = req.body;

    const existingTeacher = await Teacher.findOne({ email });

    if (existingTeacher) {
      return res.status(400).json({
        message: "Teacher already exists",
      });
    }
    const teacher = await Teacher.create({
      name,
      email,
      subject,
      experienceYears,
      createdBy: req.user._id,
    });

    res.status(201).json({
      data: teacher,
      message: "Teacher added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const GET_ALLTEACHERS = async (req, res) => {
  try {
    const teachers = await Teacher.find({});

    res.status(200).json({
      count: teachers.length,
      data: teachers,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to load Teacher's List" });
  }
};

export const GET_TEACHER = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found",
      });
    }
    res.status(200).json({
      data: teacher,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const UPDATE_TEACHER = async (req, res) => {
  try {
    const { name, email, subject, experienceYears } = req.body;
    const { id } = req.params;

    const filter =
      req.user.role === "admin"
        ? { _id: id }
        : { _id: id, createdBy: req.user._id };

    const teacher = await Teacher.findOne(filter);

    if (!teacher)
      return res.status(404).json({
        data: null,
        message: "Teacher not found",
      });

    teacher.name = name;
    teacher.email = email;
    teacher.subject = subject;
    teacher.experienceYears = experienceYears;

    await teacher.save();

    return res.status(200).json({
      data: { teacher: teacher },
      message: "Teacher Updates done Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const DELETE_TEACHER = async (req, res) => {
  try {
    const id = req.params.id;
    let teacher;

    const filter =
      req.user.role === "admin"
        ? { _id: id }
        : { _id: id, createdBy: req.user._id };

    teacher = await Teacher.findOne(filter);

    if (!teacher)
      return res
        .status(404)
        .json({ data: { teacher }, message: "Teacher doesnt exist" });

    await Teacher.deleteOne(filter);

    return res.status(200).json({
      data: { teacher: null },
      message: "Teacher Deleted Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to delete Teacher" });
  }
};
