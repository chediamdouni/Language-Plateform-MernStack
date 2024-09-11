const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Quizz = require("../models/Quizz");
const User = require("../models/User");

// ajouter un cour
const AddCourse = async (req, res, next) => {
  const { titre, description, tuteur, level, categorie, prix, prompts } =
    req.body;
  const image = req.file ? req.file.path : null;
  try {
    const newCourse = new Course({
      titre,
      description,
      tuteur,
      level,
      categorie,
      prix,
      prompts,
      image,
    });
    await newCourse.save();
    res
      .status(201)
      .json({ message: "Cours créé avec succès", course: newCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Erreur lors de la création du cours",
    });
  }
};

// edit cours
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description, tuteur, level, categorie, prix, lessons } =
      req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { titre, description, tuteur, level, categorie, prix },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    // Mise à jour des leçons et des quizzes
    for (let lesson of lessons) {
      if (lesson._id) {
        const updatedLesson = await Lesson.findByIdAndUpdate(
          lesson._id,
          {
            titre: lesson.titre,
            description: lesson.description,
            videoUrl: lesson.videoUrl,
          },
          { new: true }
        );

        for (let quiz of lesson.quizzes) {
          if (quiz._id) {
            await Quizz.findByIdAndUpdate(
              quiz._id,
              {
                name: quiz.name,
                description: quiz.description,
                deadline: quiz.deadline,
                questions: quiz.questions,
              },
              { new: true }
            );
          } else {
            const newQuiz = new Quizz({ ...quiz, lesson: updatedLesson._id });
            await newQuiz.save();
            updatedLesson.quizzes.push(newQuiz._id);
            await updatedLesson.save();
          }
        }
      } else {
        const newLesson = new Lesson({ ...lesson, cours: updatedCourse._id });
        await newLesson.save();
        updatedCourse.lessons.push(newLesson._id);
        await updatedCourse.save();
      }
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// suppression du cours
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    res.status(200).json({ message: "Cours supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// tous les cours
const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("tuteur")
      .populate("etudiantsInscrits");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id)
      .populate("lessons")
      .populate("tuteur", "username")
      .populate({
        path: "quizzes",
        populate: { path: "questions.options" },
      })
      .populate("etudiantsInscrits");
    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// recuperer le cour par id tuteur
const getCourseByTuteurId = async (req, res) => {
  try {
    const { tuteurId } = req.params;
    const courses = await Course.find({ tuteur: tuteurId })
      .populate("tuteur")
      .populate("etudiantsInscrits");
    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun cours trouvé pour ce tuteur" });
    }
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
  getCourseByTuteurId,
  consulterEtudiantsInscrits,
};
