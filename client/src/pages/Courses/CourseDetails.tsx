import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import TuteurLayout from "src/layouts/TuteurLayout";
import { FaArrowLeft } from "react-icons/fa6";

interface Course {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  tuteur: string;
  lecons: Lesson[];
  quizs: Quiz[];
}

interface Lesson {
  _id: string;
  titre: string;
  description: string;
  contenu: string;
}

interface Quiz {
  _id: string;
  nom: string;
  description: string;
  deadline: Date;
  questions: Question[];
}

interface Question {
  question: string;
  options: Option[];
}

interface Option {
  text: string;
  correct: boolean;
}

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessonTitre, setLessonTitre] = useState<string>("");
  const [lessonDescription, setLessonDescription] = useState<string>("");
  const [quizName, setQuizName] = useState<string>("");
  const [quizDescription, setQuizDescription] = useState<string>("");
  const [quizDeadline, setQuizDeadline] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: [{ text: "", correct: false }] },
  ]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const fetchCourse = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du cours", error);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleAddLessonWithQuiz = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("titre", lessonTitre);
      formData.append("description", lessonDescription);
      if (videoFile) {
        formData.append("video", videoFile);
      }

      const lessonResponse = await axios.post(
        `http://localhost:5000/api/courses/${id}/lessons`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const lessonId = lessonResponse.data._id;

      // Ajouter le quiz à la leçon
      await axios.post(
        `http://localhost:5000/api/courses/${id}/lessons/${lessonId}/quizzes`,
        {
          cours: id,
          name: quizName,
          description: quizDescription,
          deadline: quizDeadline,
          questions,
        }
      );
      console.log(quizName);
      console.log(quizDescription);
      console.log(quizDeadline);
      console.log(questions);

      // Réinitialiser les champs
      setLessonTitre("");
      setLessonDescription("");
      setVideoFile(null);
      setQuizName("");
      setQuizDescription("");
      setQuizDeadline("");
      setQuestions([{ question: "", options: [{ text: "", correct: false }] }]);

      navigate(`/displayTutorsCourses/${id}`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la leçon avec quiz", error);
    }
  };

  return (
    <TuteurLayout>
      <div className="container mx-auto p-4 bg-gray-200 font-Korto-Medium ">
        <Card className="w-full flex">
          <CardBody>
            {course ? (
              <>
                <Typography
                  variant="h2"
                  color="blue-gray"
                  className="mb-3 uppercase font-nunito"
                >
                  <button className="mr-4" onClick={() => navigate(-1)}>
                    <FaArrowLeft size={27} />
                  </button>
                  {course.titre}
                </Typography>
                <Typography variant="paragraph" className="mb-8 mx-4">
                  Description : {course.description}
                </Typography>

                <Typography variant="h4" color="blue-gray" className="mb-4">
                  Ajouter une Leçon
                </Typography>
                <form
                  onSubmit={handleAddLessonWithQuiz}
                  className="flex flex-col gap-4 px-4 py-2"
                >
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    Détails de la Leçon
                  </Typography>
                  <Input
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    label="Titre de la leçon"
                    value={lessonTitre}
                    onChange={(e) => setLessonTitre(e.target.value)}
                    required
                  />
                  <Textarea
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    label="Description de la leçon"
                    value={lessonDescription}
                    onChange={(e) => setLessonDescription(e.target.value)}
                    required
                  />
                  <Input
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setVideoFile(e.target.files ? e.target.files[0] : null)
                    }
                  />

                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mt-6 mb-2"
                  >
                    Détails du Quiz
                  </Typography>
                  <Input
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    label="Nom du quiz"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    required
                  />
                  <Textarea
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    label="Description du quiz"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                  />
                  <Input
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    label="Date limite"
                    value={quizDeadline}
                    onChange={(e) => setQuizDeadline(e.target.value)}
                    required
                  />

                  {questions.map((question, qIndex) => (
                    <Card key={qIndex} className="p-4 mb-4 ">
                      <Input
                        className="block mb-4 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        label="Question"
                        value={question.question}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].question = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        required
                      />
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className="flex items-center gap-4 mb-2 mt-2"
                        >
                          <Input
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            label="Option"
                            value={option.text}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[qIndex].options[oIndex].text =
                                e.target.value;
                              setQuestions(newQuestions);
                            }}
                            required
                          />
                          <Checkbox
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            checked={option.correct}
                            onChange={(e) => {
                              const newQuestions = [...questions];
                              newQuestions[qIndex].options[oIndex].correct =
                                e.target.checked;
                              setQuestions(newQuestions);
                            }}
                            label="Correct"
                          />
                        </div>
                      ))}
                      <Button
                        size="sm"
                        color="blue"
                        variant="outlined"
                        onClick={() => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].options.push({
                            text: "",
                            correct: false,
                          });
                          setQuestions(newQuestions);
                        }}
                        className="mt-2 w-24 flex self-end"
                      >
                        Ajouter Option
                      </Button>
                    </Card>
                  ))}
                  <Button
                    color="blue"
                    variant="outlined"
                    onClick={() => {
                      setQuestions([
                        ...questions,
                        {
                          question: "",
                          options: [{ text: "", correct: false }],
                        },
                      ]);
                    }}
                    className="mb-4 w-64 mx-auto"
                  >
                    Ajouter Question
                  </Button>

                  <div className="flex justify-end">
                    <Button type="submit" color="blue" ripple>
                      Ajouter Leçon avec Quiz
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <Typography>Chargement du cours...</Typography>
            )}
          </CardBody>
        </Card>
      </div>
    </TuteurLayout>
  );
};

export default CourseDetails;
