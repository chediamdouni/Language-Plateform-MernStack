var express = require("express");
const {
  AddCourse,
  updateCourse,
  registredCourses,
  registerMultipleCourses,
  registerSingleCourse,
  unregisterCourse,
  deleteCourse,
  getCourseById,
  getAllCourse,
  consulterEtudiantsInscrits,
  getCourseByTuteurId,
} = require("../controllers/CoursesController");
const { videoHandler, singleImageHandler } = require("../utils/imageUpload");
const {
  addLessonToCourse,
  getLessonsByCourse,
  addQuizToLessons,
  getQuizzesByLesson,
  deleteQuiz,
  getQuizz,
  markLessonAsCompleted,
} = require("../controllers/LessonController");

var router = express.Router();

router.get("/all", getAllCourse);
router.get("/tuteur/:tuteurId", getCourseByTuteurId);
router.get("/:id", getCourseById);
router.post("/add", singleImageHandler, AddCourse);
router.put("/edit/:id", updateCourse);
router.delete("/delete/:CourseId", deleteCourse);
router.post("/inscription");
router.post("/inscription-multiple", registerMultipleCourses);
router.delete("/desinscription", unregisterCourse);
router.post("/cours-inscrits/:userId", registredCourses);
router.get("/etudiants-inscrits/:CourseId", consulterEtudiantsInscrits);

// Route pour ajouter une leçon à un cours existant
router.post("/:id/lessons", videoHandler, addLessonToCourse);
router.get("/:id/fetch/lessons", getLessonsByCourse);
router.post("/lesson/completed", markLessonAsCompleted);
// Route pour ajouter un quiz à un cours existant
router.post("/:courseId/lessons/:lessonId/quizzes", addQuizToLessons);
router.get("/quizz/all", getQuizz);
router.get("/lessons/:lessonId/quizzes", getQuizzesByLesson);
router.delete("/quizzes/:quizId/:lessonId", deleteQuiz);
module.exports = router;
