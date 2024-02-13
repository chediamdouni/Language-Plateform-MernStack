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
} = require("../controllers/CoursesController");
var router = express.Router();

router.get("/all", getAllCourse);
router.get("/:CourseId", getCourseById);
router.post("/add", AddCourse);
router.put("/edit/:CourseId", updateCourse);
router.delete("/:CourseId", deleteCourse);
router.post("/inscription", registerSingleCourse);
router.post("/inscription-multiple", registerMultipleCourses);
router.delete("/desinscription", unregisterCourse);
router.post("/cours-inscrits/:userId", registredCourses);
router.get("/etudiants-inscrits/:CourseId", consulterEtudiantsInscrits);

module.exports = router;
