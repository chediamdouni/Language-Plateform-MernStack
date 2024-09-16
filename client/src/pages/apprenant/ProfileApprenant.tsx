import React, { useContext, useEffect } from "react";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import {
  Typography,
  Button,
  Card,
  Avatar,
  Chip,
  Tooltip,
} from "@material-tailwind/react";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import courses from "../../assets/images/Courses.png";
import trial from "../../assets/images/Trial.png";
import subscribe from "../../assets/images/Subscribe.png";
import newsBanner from "../../assets/images/avatarProfile.jpg";
import tutors from "../../assets/images/Tutors.png";
import { AuthContext } from "src/Context/AuthContext";
import courseFrench from "../../assets/images/cours13.png";
import courseEnglish from "../../assets/images/cours12.png";
import courseSpanish from "../../assets/images/cours10.png";
import { toast } from "react-toastify";
import axios from "axios";
import { StarIcon } from "lucide-react";
import SubscriptionInfo from "../../components/SubscriptionInfo";

const recommendedCourses = [
  {
    id: 1,
    title: "Français pour débutants",
    image: courseFrench,
    rating: 4.8,
    students: 1234,
    price: "19,99 €",
  },
  {
    id: 2,
    title: "Anglais intermédiaire",
    image: courseEnglish,
    rating: 4.6,
    students: 2345,
    price: "24,99 €",
  },
  {
    id: 3,
    title: "Espagnol avancé",
    image: courseSpanish,
    rating: 4.9,
    students: 987,
    price: "29,99 €",
  },
];

const apiUrl = process.env.REACT_APP_API_URL;

const ProfileApprenant = () => {
  const { user, isSignedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isSignedIn) {
      navigate("/apprenant/connexion");
    }
  }, [loading, isSignedIn, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Chargement...
      </div>
    );
  }

  const handleResendVerification = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/resend-verification-email`,
        { email: user?.email },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(
          "Un nouvel email de vérification a été envoyé. Veuillez vérifier votre boîte de réception."
        );
      } else {
        toast.error(
          response.data.message ||
            "Une erreur s'est produite lors de l'envoi de l'email de vérification."
        );
      }
    } catch (error: any) {
      console.error("Erreur détaillée:", error.response || error);
      toast.error(
        "Une erreur s'est produite lors de l'envoi de l'email de vérification. Veuillez réessayer plus tard."
      );
    }
  };

  return (
    <ApprenantLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profil de l'utilisateur */}
          <Card className="p-6 shadow-lg rounded-xl">
            <div className="flex flex-col items-center">
              <Avatar
                src={`http://localhost:5000/${user?.profileImage}`}
                alt="Profile"
                size="xxl"
                className="mb-4 ring-4 ring-blue-500"
              />
              <Typography variant="h4" className="mb-2 text-center">
                Bienvenue, {user?.username} !
              </Typography>
              {user?.verified ? (
                <Chip
                  color="green"
                  value="Compte vérifié"
                  icon={<CheckCircleIcon className="h-4 w-4" />}
                />
              ) : (
                <div className="text-center">
                  <Chip
                    color="amber"
                    value="Compte non vérifié"
                    icon={<ExclamationCircleIcon className="h-4 w-4" />}
                  />
                  <Button
                    color="blue"
                    variant="text"
                    className="mt-2"
                    onClick={handleResendVerification}
                  >
                    Renvoyer l'email de vérification
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Actions rapides */}
          <Card className="p-6 shadow-lg rounded-xl">
            <Typography variant="h5" className="mb-4">
              Actions rapides
            </Typography>
            <div className="space-y-4">
              {[
                {
                  icon: trial,
                  title: "Cours d'essai",
                  desc: "30 minutes pour 1,00 $US",
                },
                {
                  icon: subscribe,
                  title: "S'abonner",
                  desc: "Choisissez votre programme",
                },
                {
                  icon: tutors,
                  title: "Trouver un tuteur",
                  desc: "Parcourez nos tuteurs",
                },
                {
                  icon: courses,
                  title: "Voir les cours",
                  desc: "Découvrez nos supports",
                },
              ].map((item, index) => (
                <Button
                  key={index}
                  color="blue"
                  variant="outlined"
                  className="w-full flex items-center justify-between p-4"
                  onClick={() => navigate("/apprenant")}
                >
                  <div className="flex items-center">
                    <img src={item.icon} alt="" className="w-10 h-10 mr-4" />
                    <div className="text-left">
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="small" color="gray">
                        {item.desc}
                      </Typography>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </Card>

          {/* Comment ça fonctionne */}
          <Card className="p-6 shadow-lg rounded-xl">
            <img
              src={newsBanner}
              alt="LearnUp"
              className="w-full mb-4 rounded-lg"
            />
            <Typography variant="h5" className="mb-4">
              Comment fonctionne LearnUp
            </Typography>
            <ul className="space-y-2">
              {[
                "Discutez en direct avec des tuteurs natifs",
                "Planifiez des leçons 24/7",
                "Tous les outils inclus dans l'abonnement",
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                  <Typography>{item}</Typography>
                </li>
              ))}
            </ul>
            <Button
              color="blue"
              className="mt-6 w-full"
              onClick={() => navigate("/apprenant")}
            >
              Commencer maintenant
            </Button>
          </Card>
        </div>
        {/* <SubscriptionInfo userId={user?.id} /> */}
        {/* Tuteurs recommandés */}
        <Card className="mt-8 p-6 shadow-lg rounded-xl">
          <Typography variant="h5" className="mb-6">
            Tuteurs recommandés
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="p-4 shadow-md">
                <video
                  className="w-full h-40 object-cover rounded-lg mb-4"
                  controls
                >
                  <source
                    src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                    type="video/mp4"
                  />
                  Votre navigateur ne supporte pas la lecture vidéo.
                </video>
                <Typography variant="h6">Tuteur {index + 1}</Typography>
                <Typography variant="small" color="gray" className="mb-2">
                  Accent Américain • Tuteur depuis 2023
                </Typography>
                <Button
                  color="blue"
                  variant="outlined"
                  fullWidth
                  className="mt-2"
                >
                  Voir le profil
                </Button>
              </Card>
            ))}
          </div>
        </Card>
        {/* Cours recommandés */}
        <Card className="mt-8 p-6 shadow-lg rounded-xl">
          <Typography variant="h5" className="mb-6">
            Cours recommandés pour vous
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <Typography variant="h6" className="mb-2">
                    {course.title}
                  </Typography>
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <Typography className="mr-2">{course.rating}</Typography>
                    <Typography color="gray">
                      ({course.students} étudiants)
                    </Typography>
                  </div>
                  <Typography variant="h6" color="blue" className="mb-3">
                    {course.price}
                  </Typography>
                  <Button
                    color="blue"
                    fullWidth
                    className="flex items-center justify-center gap-2"
                  >
                    S'inscrire au cours
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </ApprenantLayout>
  );
};
export default ProfileApprenant;
