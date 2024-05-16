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
    const course = await Course.findById(CourseId);
    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

// inscription a un seul cour
const registerSingleCourse = async (req, res) => {
  const { CourseId } = req.body;
  const userId = req.user._id;
  console.log(userId);
  try {
    const course = await Course.findById(CourseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (!course.etudiantsInscrits.includes(userId)) {
      return res.status(400).json({ message: "étudiant n'est pas trouvé" });
    }
    course.etudiantsInscrits.push(userId);
    await course.save();
    res.status(200).json({ message: "inscription au cours réussie" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
// inscription a plusieurs cours
const registerMultipleCourses = async (req, res) => {
  const { CourseId } = req.body;
  const userId = req.user._id;
  try {
    const courses = await Course.find({ _id: { $in: CourseId } });
    const inscrits = [];

    for (const course of courses) {
      if (!course.etudiantsInscrits.includes(userId)) {
        course.etudiantsInscrits.push(userId);
        await course.save();
        inscrits.push(course);
      }
    }
    res.status(200).json(inscrits);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "l'inscription à plusieurs cours n'a pas ete éffectuer",
    });
  }
};

// Desincription d'un cours
const unregisterCourse = async (req, res) => {
  const { CourseId } = req.body;
  const userId = req.user._id;
  try {
    const course = await Course.findById(CourseId);
    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    if (!course.etudiantsInscrits.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Vous n'êtes pas inscrit à ce cours" });
    }

    course.etudiantsInscrits = course.etudiantsInscrits.filter(
      (id) => id !== userId
    );
    await course.save();

    res.status(200).json({ message: "Désinscription du cours réussie" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "la desincription du cour n'a pas ete effectuer " });
  }
};
// consulter les cours auxquels les apprenants sont inscrits
const registredCourses = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId).populate("etudiantsInscrits");
    if (!user) {
      return res.status(404).json({ message: "User n'est pas trouvé" });
    }
    res.status(200).json({ coursInscrits: user.etudiantsInscrits });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "il y a un probleme dans les cours enregistrés " });
  }
};

// consulter les apprenants inscrits a un cours
const consulterEtudiantsInscrits = async (req, res) => {
  const CourseId = req.params.courseId;
  try {
    const course = await Course.findById(CourseId).populate(etudiantsInscrits);
    if (!course) {
      return res.status(404).json({ message: "le cours est introuvable" });
    }
    res.status(200).json({ etudiantsInscrits: course.etudiantsInscrits });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erreur consulter les apprenants inscrits a un cours",
    });
  }
};

module.exports = {
  AddCourse,
  updateCourse,
  registredCourses,
  registerMultipleCourses,
  registerSingleCourse,
  deleteCourse,
  getCourseById,
  getAllCourse,
  unregisterCourse,
  consulterEtudiantsInscrits,
};
