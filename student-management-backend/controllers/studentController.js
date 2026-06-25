import Student from "../models/student.js";

export const createStudent = async (req, res) => {
  try {
    const { name, rollNumber, grade, age } = req.body;

    const existingStudent = await Student.findOne({ name });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student already exists",
      });
    }
    const student = await Student.create({
      name,
      rollNumber,
      grade,
      age,
      createdBy: req.user._id,
    });
    res.status(201).json({
      data: student,
      message: "Student added successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const GET_ALLSTUDENTS = async (req, res) => {
  try {
    const students = await Student.find({});

    res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to load Student's List" });
  }
};

export const GET_STUDENT = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }
    res.status(200).json({
      data: student,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const UPDATE_STUDENT = async (req, res) => {
  try {
    const { name, rollNumber, grade, age } = req.body;
    const { id } = req.params;

    const filter =
      req.user.role === "admin"
        ? { _id: id }
        : { _id: id, createdBy: req.user._id };

    const student = await Student.findOne(filter);

    if (!student)
      return res.status(404).json({
        data: null,
        message: "Student not found",
      });

    student.name = name;
    student.rollNumber = rollNumber;
    student.grade = grade;
    student.age = age;

    await student.save();

    return res.status(200).json({
      data: { student: student },
      message: "Student Updates done Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const DELETE_STUDENT = async (req, res) => {
  try {
    const id = req.params.id;
    let student;

    const filter =
      req.user.role === "admin"
        ? { _id: id }
        : { _id: id, createdBy: req.user._id };

    student = await Student.findOne(filter);

    if (!student)
      return res
        .status(404)
        .json({ data: null, message: "Student doesnt exist" });

    await Student.deleteOne(filter);

    return res.status(200).json({
      data: null,
      message: "Student Deleted Successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message, message: "Failed to delete Student" });
  }
};
