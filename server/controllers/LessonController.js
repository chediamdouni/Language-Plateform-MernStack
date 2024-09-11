const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Quizz = require("../models/Quizz");

// Ajouter une leçon à un cours existant
const addLessonToCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { titre, description } = req.body;
    const videoFile = req.file;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    const lesson = new Lesson({
      titre,
      description,
      videoUrl: videoFile ? videoFile.filename : undefined,
      cours: course._id,
    });

    const savedLesson = await lesson.save();
    course.lessons.push(savedLesson._id);
    await course.save();

    res.status(201).json(savedLesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'ajout de la leçon" });
  }
};
// Récupérer les leçons d'un cours
const getLessonsByCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé" });
    }

    const lessons = await Lesson.find({ cours: course._id });
    res.status(200).json(lessons);
  } catch (error) {
    console.error("Erreur lors de la récupération des leçons", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des leçons" });
  }
};
// Ajouter un quiz à un leçon existant
const addQuizToLessons = async (req, res) => {
  const { lessonId } = req.params;
  const { name, description, deadline, questions } = req.body;
  console.log(req.body);
  try {
    const newQuiz = new Quizz({
      cours: req.params.courseId,
      name,
      description,
      deadline,
      questions,
    });
    console.log(newQuiz);
    const savedQuiz = await newQuiz.save();
    console.log("saved one ", savedQuiz);
    const lesson = await Lesson.findById(lessonId);
    lesson.quizzes.push(savedQuiz._id);
    await lesson.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du quiz", error });
  }
};
const getQuizz = async (req, res) => {
  try {
    const Quizzs = await Quizz.find().populate("cours");
    res.status(200).json(Quizzs);
  } catch (error) {
    console.log("Erreur de lister les Quizzs ", error);
    res.status(500).send(error);
  }
};
const deleteQuiz = async (req, res) => {
  const { quizId, lessonId } = req.params;

  try {
    // Supprimer le quiz
    await Quizz.findByIdAndDelete(quizId);

    // Mettre à jour la leçon en supprimant le quiz de la liste
    const lesson = await Lesson.findById(lessonId);
    lesson.quizzes = lesson.quizzes.filter(
      (quiz) => quiz.toString() !== quizId
    );
    await lesson.save();

    res.status(200).json({ message: "Quiz supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du quiz", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du quiz", error });
  }
};
const getQuizzesByLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const lesson = await Lesson.findById(lessonId).populate("quizzes");

    if (!lesson) {
      return res.status(404).json({ message: "Leçon non trouvée" });
    }

    const quizzes = lesson.quizzes;
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Erreur lors de la récupération des quiz", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des quiz" });
  }
};
const markLessonAsCompleted = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res.status(404).json({ message: "Leçon non trouvée" });
    }

    lesson.isCompleted = true;
    await lesson.save();

    res.status(200).json({ message: "Leçon marquée comme terminée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getQuizzesByLesson,
  addLessonToCourse,
  getLessonsByCourse,
  addQuizToLessons,
  getQuizz,
  deleteQuiz,
  markLessonAsCompleted,
};
