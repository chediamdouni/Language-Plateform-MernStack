import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import TuteurLayout from "src/layouts/TuteurLayout";

interface Quiz {
  _id?: string;
  name: string;
  description: string;
  deadline: string;
  questions: Array<{
    questionText: string;
    options: Array<{ optionText: string; isCorrect: boolean }>;
  }>;
}

interface Lesson {
  _id?: string;
  titre: string;
  description: string;
  videoUrl?: string;
  quizzes: Quiz[];
}

interface Course {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  image: string;
  tuteur: {
    _id: string;
    username: string;
  };
  niveau: string;
  categorie: string;
  lessons: Lesson[];
}

const UpdateCourse = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [newLesson, setNewLesson] = useState<Lesson>({
    titre: "",
    description: "",
    quizzes: [],
  });
  const [newQuiz, setNewQuiz] = useState<Quiz>({
    name: "",
    description: "",
    deadline: "",
    questions: [],
  });
  const [selectedLessonId, setSelectedLessonId] = useState<string>("");

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${courseId}`
      );
      setCourse(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération du cours", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/courses/edit/${courseId}`,
        course
      );
      console.log("Cours mis à jour avec succès", response.data);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du cours", error);
    }
  };

  const handleAddLesson = async () => {
    if (!course) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/api/courses/${course._id}/lessons`,
        newLesson
      );
      setCourse({
        ...course,
        lessons: [...course.lessons, response.data],
      });
      setNewLesson({ titre: "", description: "", quizzes: [] });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la leçon", error);
    }
  };

  const handleAddQuiz = async () => {
    if (!course || !selectedLessonId) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/api/courses/${course._id}/lessons/${selectedLessonId}/quizzes`,
        newQuiz
      );
      const updatedLessons = course.lessons.map((lesson) =>
        lesson._id === selectedLessonId
          ? { ...lesson, quizzes: [...lesson.quizzes, response.data] }
          : lesson
      );
      setCourse({ ...course, lessons: updatedLessons });
      setNewQuiz({ name: "", description: "", deadline: "", questions: [] });
    } catch (error) {
      console.error("Erreur lors de l'ajout du quiz", error);
    }
  };
  const handleDeleteQuiz = async (quizId: string, lessonId: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/quizzes/${quizId}/${lessonId}`
      );
      // Update local state to reflect the deletion of the quiz
      setCourse((prevCourse) => {
        if (!prevCourse) return null;

        const updatedLessons = prevCourse.lessons.map((lesson) =>
          lesson._id === lessonId
            ? {
                ...lesson,
                quizzes: lesson.quizzes.filter((quiz) => quiz._id !== quizId),
              }
            : lesson
        );

        return { ...prevCourse, lessons: updatedLessons };
      });
      console.log("Quiz successfully deleted");
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <TuteurLayout>
      <div className="container mx-auto px-4 py-8 bg-gray-900 text-gray-100">
        <Card className="w-full p-6 bg-gray-800 shadow-xl">
          <CardHeader
            floated={false}
            className="relative h-56 bg-blue-gray-500"
          >
            <img
              src={`http://localhost:5000/${course?.image}`}
              alt="Course background"
              className="w-full h-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-6 text-gray-100"
            >
              Mise à jour du cours
            </Typography>
            {course && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="h6" className="mb-2 text-gray-300">
                      Titre
                    </Typography>
                    <Input
                      size="lg"
                      value={course.titre}
                      onChange={(e) =>
                        setCourse({ ...course, titre: e.target.value })
                      }
                      className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <div>
                    <Typography variant="h6" className="mb-2 text-gray-300">
                      Prix
                    </Typography>
                    <Input
                      type="number"
                      size="lg"
                      value={course.prix}
                      onChange={(e) =>
                        setCourse({
                          ...course,
                          prix: parseFloat(e.target.value),
                        })
                      }
                      className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Typography variant="h6" className="mb-2 text-gray-300">
                    Description
                  </Typography>
                  <Textarea
                    size="lg"
                    value={course.description}
                    onChange={(e) =>
                      setCourse({ ...course, description: e.target.value })
                    }
                    className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>

                {course.lessons.map((lesson, lessonIndex) => (
                  <Card
                    key={lesson._id || lessonIndex}
                    className="mt-6 bg-gray-700 shadow-md"
                  >
                    <CardBody>
                      <Typography variant="h5" className="mb-4 text-gray-200">
                        Leçon {lessonIndex + 1}
                      </Typography>
                      <div className="space-y-4">
                        <Input
                          label="Titre de la leçon"
                          size="lg"
                          value={lesson.titre}
                          onChange={(e) =>
                            setCourse({
                              ...course,
                              lessons: course.lessons.map((l, idx) =>
                                idx === lessonIndex
                                  ? { ...l, titre: e.target.value }
                                  : l
                              ),
                            })
                          }
                          className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-600"
                        />
                        <Textarea
                          label="Description de la leçon"
                          size="lg"
                          value={lesson.description}
                          onChange={(e) =>
                            setCourse({
                              ...course,
                              lessons: course.lessons.map((l, idx) =>
                                idx === lessonIndex
                                  ? { ...l, description: e.target.value }
                                  : l
                              ),
                            })
                          }
                          className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-600"
                        />
                        {lesson.quizzes.map((quiz, quizIndex) => (
                          <Card
                            key={quiz._id || quizIndex}
                            className="mt-4 bg-gray-600 shadow-sm"
                          >
                            <CardBody>
                              <Typography
                                variant="h6"
                                className="mb-2 text-gray-200"
                              >
                                Quiz {quizIndex + 1}
                              </Typography>
                              <div className="space-y-2">
                                <Input
                                  label="Nom du quiz"
                                  size="lg"
                                  value={quiz.name}
                                  onChange={(e) =>
                                    setCourse({
                                      ...course,
                                      lessons: course.lessons.map((l, idx) =>
                                        idx === lessonIndex
                                          ? {
                                              ...l,
                                              quizzes: l.quizzes.map(
                                                (q, qIdx) =>
                                                  qIdx === quizIndex
                                                    ? {
                                                        ...q,
                                                        name: e.target.value,
                                                      }
                                                    : q
                                              ),
                                            }
                                          : l
                                      ),
                                    })
                                  }
                                  className="!border-gray-500 focus:!border-blue-500 text-gray-100 bg-gray-700"
                                />
                                <Textarea
                                  label="Description du quiz"
                                  size="lg"
                                  value={quiz.description}
                                  onChange={(e) =>
                                    setCourse({
                                      ...course,
                                      lessons: course.lessons.map((l, idx) =>
                                        idx === lessonIndex
                                          ? {
                                              ...l,
                                              quizzes: l.quizzes.map(
                                                (q, qIdx) =>
                                                  qIdx === quizIndex
                                                    ? {
                                                        ...q,
                                                        description:
                                                          e.target.value,
                                                      }
                                                    : q
                                              ),
                                            }
                                          : l
                                      ),
                                    })
                                  }
                                  className="!border-gray-500 focus:!border-blue-500 text-gray-100 bg-gray-700"
                                />
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                ))}
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleUpdateCourse}
                    color="blue"
                    ripple={true}
                  >
                    Mettre à jour le cours
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>

        <Card className="mt-8 p-6 bg-gray-800 shadow-xl">
          <Typography variant="h4" className="mb-4 text-gray-100">
            Ajouter une nouvelle leçon
          </Typography>
          <div className="space-y-4">
            <Input
              label="Titre de la leçon"
              size="lg"
              value={newLesson.titre}
              onChange={(e) =>
                setNewLesson({ ...newLesson, titre: e.target.value })
              }
              className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
            />
            <Textarea
              label="Description de la leçon"
              size="lg"
              value={newLesson.description}
              onChange={(e) =>
                setNewLesson({ ...newLesson, description: e.target.value })
              }
              className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
            />
            <div className="flex justify-end">
              <Button onClick={handleAddLesson} color="blue" ripple={true}>
                Ajouter la leçon
              </Button>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-6 bg-gray-800 shadow-xl">
          <Typography variant="h4" className="mb-4 text-gray-100">
            Ajouter un nouveau quiz
          </Typography>
          <div className="space-y-4">
            <Input
              label="Nom du quiz"
              size="lg"
              value={newQuiz.name}
              onChange={(e) => setNewQuiz({ ...newQuiz, name: e.target.value })}
              className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
            />
            <Textarea
              label="Description du quiz"
              size="lg"
              value={newQuiz.description}
              onChange={(e) =>
                setNewQuiz({ ...newQuiz, description: e.target.value })
              }
              className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
            />
            <Input
              type="date"
              label="Date limite du quiz"
              size="lg"
              value={newQuiz.deadline}
              onChange={(e) =>
                setNewQuiz({ ...newQuiz, deadline: e.target.value })
              }
              className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
            />
            <Select
              label="Leçon associée"
              value={selectedLessonId}
              onChange={(value) => setSelectedLessonId(value || "")}
              className="!border-gray-600 focus:!border-blue-500 text-gray-100 bg-gray-700"
            >
              {course?.lessons.map((lesson) => (
                <Option key={lesson._id} value={lesson._id}>
                  {lesson.titre}
                </Option>
              ))}
            </Select>
            <div className="flex justify-end">
              <Button onClick={handleAddQuiz} color="blue" ripple={true}>
                Ajouter le quiz
              </Button>
            </div>
          </div>
        </Card>

        <Card className="mt-8 p-6 bg-gray-800 shadow-xl">
          <Typography variant="h4" className="mb-4 text-gray-100">
            Quizzes
          </Typography>
          <div className="space-y-4">
            {course?.lessons.map((lesson) => (
              <div key={lesson._id} className="border-b border-gray-700 pb-4">
                <Typography variant="h5" className="mb-2 text-gray-200">
                  {lesson.titre}
                </Typography>
                {lesson.quizzes.map((quiz) => (
                  <div
                    key={quiz._id}
                    className="flex items-center justify-between py-2"
                  >
                    <Typography className="text-gray-300">
                      {quiz.name}
                    </Typography>
                    <Button
                      color="red"
                      variant="text"
                      size="sm"
                      ripple={false}
                      onClick={() =>
                        handleDeleteQuiz(quiz?._id ?? "", lesson?._id ?? "")
                      }
                    >
                      Supprimer
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </TuteurLayout>
  );
};

export default UpdateCourse;
