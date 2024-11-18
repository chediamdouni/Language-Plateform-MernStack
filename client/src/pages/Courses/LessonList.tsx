import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";

import ApprenantLayout from "src/layouts/ApprenantLayout";
import { toast } from "react-toastify";
import { AuthContext } from "src/Context/AuthContext";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  BookOpenIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
} from "lucide-react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Course {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  tuteur: {
    _id: string;
    username: string;
  };
  lessons: Lesson[];
  quizzes: Quiz[];
}

interface Lesson {
  _id: string;
  titre: string;
  description: string;
  videoUrl?: string;
  isCompleted: boolean;
}

interface Quiz {
  _id: string;
  name: string;
  description: string;
  deadline: Date;
  questions: Question[];
}

interface Question {
  _id: string;
  question: string;
  options: Option[];
}

interface Option {
  _id: string;
  text: string;
  correct: boolean;
}
interface Progression {
  user: string;
  course: string;
  completedLessons: string[];
  completionPercentage: number;
  progress: number;
  startedAt: Date;
  completedAt?: Date;
}

const LessonList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [progression, setProgression] = useState<Progression | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [course, setCourse] = useState<Course | null>(null);
  const percentage = 66;
  const handleOpen = (value: any) => {
    setOpen(open === value ? 0 : value);
  };

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du cours", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses/${id}/fetch/lessons`);
      setLessons(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des leçons", error);
    }
  };

  const fetchQuizzes = async (lessonId: string) => {
    try {
      const response = await axios.get(
        `${apiUrl}/courses/lessons/${lessonId}/quizzes`
      );
      console.log(response.data);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des quiz", error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [id]);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    fetchQuizzes(lesson._id);
  };

  const handleQuizClick = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < (selectedQuiz?.questions.length || 0) - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionId });
  };

  const handleSubmitQuiz = async () => {
    if (selectedQuiz) {
      let score = 0;
      selectedQuiz.questions.forEach((question) => {
        const selectedOptionId = selectedAnswers[question._id];
        const selectedOption = question.options.find(
          (option) => option._id === selectedOptionId
        );
        if (selectedOption && selectedOption.correct) {
          score += 1;
        }
      });
      setScore(score);
      setShowResults(true);

      if (selectedLesson && score >= selectedQuiz.questions.length / 2) {
        try {
          await axios.post(`${apiUrl}/courses/lesson/completed`, {
            lessonId: selectedLesson._id,
          });
          toast.success("Leçon terminée avec succès !");
          updateProgression(selectedLesson._id);
          fetchLessons();
        } catch (error) {
          console.error("Erreur lors de la mise à jour de la leçon", error);
          toast.error("Erreur lors de la mise à jour de la leçon.");
        }
      }
    }
  };
  const markQuizAsCompleted = async (quizId: string) => {
    try {
      const response = await axios.post(
        `${apiUrl}/progression/quiz/completed`,
        {
          quizId: quizId,
          userId: user?.id,
          courseId: id,
        }
      );
      if (response.status === 200) {
        setCompletedQuizzes((prev) => [...prev, quizId]);
        toast.success("Quiz marked as completed!");
      }
    } catch (error) {
      console.error("Error marking quiz as completed:", error);
      toast.error("Failed to mark quiz as completed.");
    }
  };
  useEffect(() => {
    const fetchCompletedQuizzes = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/progression/${user?.id}/${id}`
        );
        setCompletedQuizzes(response.data.completedQuizzes || []);
      } catch (error) {
        console.error("Error fetching completed quizzes:", error);
      }
    };

    if (user?.id && id) {
      fetchCompletedQuizzes();
    }
  }, [user?.id, id]);
  useEffect(() => {
    const fetchUserProgression = async () => {
      const userId = user?.id;
      const courseId = id;
      if (!userId || !courseId) {
        return;
      }
      try {
        const response = await axios.get(
          `${apiUrl}/progression/${userId}/${courseId}`
        );
        console.log(response.data);
        setProgression(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la progression",
          error
        );
      }
    };

    fetchUserProgression();
  }, [user?.id, id]);

  const updateProgression = async (lessonId: string) => {
    try {
      const userId = user?.id;
      const courseId = id;
      if (!userId || !courseId) return;

      const response = await axios.post(
        `${apiUrl}/progression/update/${userId}/${courseId}`,
        {
          lessonId,
        }
      );
      console.log("updated progression", response);
      toast.success("Progression mise à jour avec succès !");
      fetchLessons();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la progression", error);
      toast.error("Erreur lors de la mise à jour de la progression.");
    }
  };

  const calculateProgression = () => {
    if (!progression || !lessons.length) return 0;

    const completedLessons = lessons.filter((lesson) => lesson.isCompleted);
    return (completedLessons.length / lessons.length) * 100;
  };

  const completionPercentage = calculateProgression();

  return (
    <ApprenantLayout>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-50 shadow-lg h-screen overflow-y-auto">
          <div className="p-8 sticky top-0 bg-gray-50 z-10">
            <Typography
              variant="h4"
              className="mb-6 text-gray-800 font-semibold"
            >
              Contenu du cours
            </Typography>
            <div className="mb-8 bg-white rounded-xl p-6 shadow-sm">
              <div className="relative">
                <CircularProgressbar
                  value={progression?.progress || 0}
                  strokeWidth={8}
                />

                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <Typography variant="h3" className="font-bold text-blue-600">
                    {progression?.progress || 0}%
                  </Typography>
                </div>
              </div>
              <Typography className="mt-4 text-center text-gray-600">
                Progression du cours
              </Typography>
            </div>
          </div>
          <div className="px-4">
            <List>
              {lessons.map((lesson, index) => (
                <ListItem
                  key={lesson._id}
                  className={`mb-3 rounded-lg transition-all duration-300 ${
                    selectedLesson?._id === lesson._id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleLessonClick(lesson)}
                >
                  <div className="flex items-center py-2 px-3">
                    <div className="mr-4 flex-shrink-0">
                      {lesson.isCompleted ? (
                        <div className="bg-green-100 rounded-full p-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-gray-200 rounded-full p-2">
                          <PlayCircleIcon className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <Typography className="text-sm text-gray-500">
                        Leçon {index + 1}
                      </Typography>
                      <Typography className="font-medium text-gray-800">
                        {lesson.titre}
                      </Typography>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {selectedLesson ? (
            <div className="max-w-3xl mx-auto">
              <Card className="mb-8 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                  <Typography variant="h3" className="text-white mb-2">
                    {selectedLesson.titre}
                  </Typography>
                  <Typography className="text-indigo-100">
                    {selectedLesson.description}
                  </Typography>
                </div>
                {selectedLesson.videoUrl && (
                  <div className="aspect-w-16 aspect-h-9">
                    <video controls className="w-full h-full object-cover">
                      <source
                        src={`http://localhost:5000/uploads/${encodeURIComponent(
                          selectedLesson.videoUrl
                        )}`}
                        type="video/mp4"
                      />
                      Your browser does not support video playback.
                    </video>
                  </div>
                )}
              </Card>

              {/* Quizzes */}
              <Card className="p-6">
                <Typography variant="h5" className="mb-4 text-gray-800">
                  Quizzes
                </Typography>
                {quizzes.length > 0 ? (
                  <div className="space-y-4">
                    {quizzes.map((quiz) => (
                      <div
                        key={quiz._id}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div
                          onClick={() => handleQuizClick(quiz)}
                          className="cursor-pointer flex-1"
                        >
                          <Typography className="font-medium text-gray-800">
                            {quiz.name}
                          </Typography>
                          <Typography className="text-sm text-gray-500">
                            {quiz.description}
                          </Typography>
                        </div>
                        {completedQuizzes.includes(quiz._id) ? (
                          <Button
                            color="green"
                            size="sm"
                            disabled
                            className="ml-4"
                          >
                            Completed
                          </Button>
                        ) : (
                          <Button
                            color="indigo"
                            size="sm"
                            onClick={() => markQuizAsCompleted(quiz._id)}
                            className="ml-4"
                          >
                            Mark as Completed
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Typography className="text-gray-600">
                    No quizzes available for this lesson.
                  </Typography>
                )}
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <BookOpenIcon className="h-16 w-16 text-gray-400 mb-4" />
              <Typography variant="h5" className="text-gray-600">
                Select a lesson to begin
              </Typography>
            </div>
          )}

          {/* Quiz Modal */}
          {selectedQuiz && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <Typography variant="h4" className="mb-4 text-gray-800">
                    {selectedQuiz.name}
                  </Typography>
                  <Typography className="mb-6 text-gray-600">
                    {selectedQuiz.description}
                  </Typography>

                  {showResults ? (
                    <div className="text-center">
                      <div className="mb-6 text-black">
                        <CircularProgressbar
                          value={(score / selectedQuiz.questions.length) * 100} // Changed 'percentage' to 'value'
                          text={`${
                            (score / selectedQuiz.questions.length) * 100
                          }%`}
                        />
                      </div>
                      <Typography variant="h5" className="mb-4 text-gray-800">
                        Your score: {score} / {selectedQuiz.questions.length}
                      </Typography>
                      {score >= selectedQuiz.questions.length / 2 ? (
                        <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6">
                          <div className="flex items-center">
                            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
                            <Typography className="text-green-700">
                              Congratulations! You passed the quiz.
                            </Typography>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
                          <div className="flex items-center">
                            <XCircleIcon className="h-6 w-6 text-red-500 mr-2" />
                            <Typography className="text-red-700">
                              Sorry, you did not pass the quiz.
                            </Typography>
                          </div>
                        </div>
                      )}
                      <Button
                        color="indigo"
                        onClick={() => setSelectedQuiz(null)}
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography variant="h6" className="mb-4 text-gray-700">
                        Question {currentQuestion + 1} of{" "}
                        {selectedQuiz.questions.length}
                      </Typography>
                      <Typography variant="h5" className="mb-6 text-gray-800">
                        {selectedQuiz.questions[currentQuestion].question}?
                      </Typography>
                      <div className="space-y-4 mb-6">
                        {selectedQuiz.questions[currentQuestion].options.map(
                          (option) => (
                            <div
                              key={option._id}
                              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                                selectedAnswers
                                  ? "bg-indigo-100 border-2 border-indigo-500"
                                  : "bg-gray-50 hover:bg-gray-100"
                              }`}
                              onClick={() =>
                                handleAnswerSelect(
                                  selectedQuiz.questions[currentQuestion]._id,
                                  option._id
                                )
                              }
                            >
                              <Typography className="font-medium text-gray-800">
                                {option.text}
                              </Typography>
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex justify-between">
                        <Button
                          color="gray"
                          onClick={handlePrevQuestion}
                          disabled={currentQuestion === 0}
                        >
                          Previous
                        </Button>
                        <Button color="indigo" onClick={handleNextQuestion}>
                          {currentQuestion === selectedQuiz.questions.length - 1
                            ? "Submit"
                            : "Next"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </ApprenantLayout>
  );
};

export default LessonList;
