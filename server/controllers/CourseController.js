const Course = require("../models/Course");
const User = require("../models/User");

// ajouter un cour
const AddCourse = async (req, res, next) => {
  const { nom, description, tuteur, prix } = req.body;
  try {
    const newCourse = new Course({
      nom,
      description,
      tuteur,
      prix,
    });
    const savedCourse = await newCourse.save();
    res.status(200).send(savedCourse);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "le cour n'est pas ajouter veuillez verifier ce qu'il ne convient pas",
    });
  }
};

// edit cours
const updateCourse = async (req, res) => {
  const CourseId = req.params.CourseId;
  const updatedFields = req.body;
  try {
    const course = await Course.findById(CourseId, updatedFields, {
      new: true,
    });
    if (!course) {
      return res.status(400).json("il n'ya pas de cours avec cet id");
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "la mise a jour du cours n'est pas effectuer correctement",
    });
  }
};

// suppression du cours
const deleteCourse = async (req, res) => {
  const CourseId = req.params.CourseId;
  try {
    const deletedCourse = Course.findByIdAndDelete(CourseId);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Le cours est introuvable" });
    }
    res.status(200).json({ message: "cours supprimer avec succes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "il y a un probleme avec la suppresion du cours veuillez verifier",
    });
  }
};

// tous les cours
const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "tu peut pas lister tous les cours veuillez verifier" });
  }
};

const getCourseById = async (req, res) => {
  const CourseId = req.params.CourseId;
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};