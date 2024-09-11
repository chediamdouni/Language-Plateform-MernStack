const Course = require("../models/Course");
const Progression = require("../models/Progression");

const updateProgression = async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;
  const { lessonId } = req.body;
  try {
    // verifier les cours
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Cours non trouvé." });
    }
    // initialiser totalLessons
    const totalLessons = course.lessons.length;
    // s'assurer est ce qu'il ya une progression ou pas
    let progression = await Progression.findOne({
      user: userId,
      course: courseId,
    });
    // creation du progression si elle se trouve pas
    if (!progression) {
      progression = new Progression({
        user: userId,
        course: courseId,
        completedLessons: [lessonId],
        completionPercentage: (1 / totalLessons) * 100,
        progress: (1 / totalLessons) * 100,
      });
    } else {
      // Vérifier si la leçon n'est pas déjà complétée
      if (!progression.completedLessons.includes(lessonId)) {
        progression.completedLessons.push(lessonId);
        const completedLessonsCount = progression.completedLessons.length;
        progression.progress = (completedLessonsCount / totalLessons) * 100;
      }
    }

    // Assurez-vous que user et course sont définis
    progression.user = userId;
    progression.course = courseId;
    console.log(progression);
    await progression.save();
    res.json(progression);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression:", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour de la progression.",
      error: error.message,
    });
  }
};

const getProgression = async (req, res) => {
  const userId = req.params.userId;
  const courseId = req.params.courseId;

  try {
    // Trouver la progression
    let progression = await Progression.findOne({
      user: userId,
      course: courseId,
    });

    if (!progression) {
      // Si aucune progression n'existe, créez-en une nouvelle
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Cours non trouvé." });
      }

      progression = new Progression({
        user: userId,
        course: courseId,
        completedLessons: [],
        completionPercentage: 0,
        progress: 0,
      });

      await progression.save();
    }

    res.json(progression);
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression:", error);
    res.status(500).json({
      message: "Erreur lors de la récupération de la progression.",
      error: error.message,
    });
  }
};

const markQuizAsCompleted = async (req, res) => {
  const { quizId, userId, courseId } = req.body;

  try {
    // Trouver ou créer un document de progression pour cet utilisateur et ce cours
    let progression = await Progression.findOne({
      user: userId,
      course: courseId,
    });

    if (!progression) {
      progression = new Progression({
        user: userId,
        course: courseId,
        completedQuizzes: [],
      });
    }

    // Ajouter le quiz s'il n'est pas déjà complété
    if (!progression.completedQuizzes.includes(quizId)) {
      progression.completedQuizzes.push(quizId);
    }

    // Sauvegarder la progression
    await progression.save();

    res.status(200).json({ message: "Quiz marqué comme complété." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la progression:", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
};

module.exports = { updateProgression, getProgression, markQuizAsCompleted };
