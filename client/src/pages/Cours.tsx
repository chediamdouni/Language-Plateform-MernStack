import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import Courses from "../assets/images/Courses.png";
import cours1 from "../assets/images/cours1.png";
import cours2 from "../assets/images/cours2.png";
import cours3 from "../assets/images/cours3.png";
import cours4 from "../assets/images/cours4.png";
import cours5 from "../assets/images/cours5.png";
import cours6 from "../assets/images/cours6.png";
import cours7 from "../assets/images/cours7.png";
import cours8 from "../assets/images/cours8.png";
import cours9 from "../assets/images/cours9.png";
import cours10 from "../assets/images/cours10.png";
import cours11 from "../assets/images/cours11.png";
import cours12 from "../assets/images/cours12.png";
import person from "../assets/images/curriculum-banner-person.png";
import book from "../assets/images/curriculum-banner-book.png";
const anglais = [
  {
    imageSrc: cours1,
    description:
      "Des cours encore plus abordables pour les vrais débutants Ce cours est gratuit avec votre abonnement Cambly",
    title: "Sujet de discussion de base",
    level: "debutant 15 cours",
  },
  {
    imageSrc: cours2,
    description:
      "Exprimez vos idées et opinions Ce cours est gratuit avec votre abonnement Cambly",
    title: "Sujet de discussion-intermediaire",
    level: "avancée 8 cours",
  },
  {
    imageSrc: cours3,
    description:
      "Explorez les sujets complexes liés à la vie moderne Ce cours est gratuit avec votre abonnement Cambly",
    title: "Sujet de discussion-avancé",
    level: "avancée 10 cours",
  },
  {
    imageSrc: cours4,
    description:
      "Leçons accessibles aux débutants complets Ce cours est gratuit avec votre abonnement Cambly",
    title: "L'anglais pour les nuls ",
    level: "Tous les niveaux 12 cours",
  },
  {
    imageSrc: cours5,
    description:
      "Des cours encore plus abordables pour les vrais débutants  Ce cours est gratuit avec votre abonnement Cambly",
    title: "L'anglais pour les nuls (partie 2)",
    level: "debutant 15 cours",
  },
  {
    imageSrc: cours6,
    description:
      "L'anglais pratique à utiliser en voyage!  Ce cours est gratuit avec votre abonnement Cambly",
    title: "L'anglais pour voyager",
    level: "imtermediaire 15 cours (Partie 2)",
  },
  {
    imageSrc: cours7,
    description: "Autre Titre",
    title: "Sujet de discussion-intermediaire (partie 2)",
    level: "Tous les niveaux 13 cours",
  },
  {
    imageSrc: cours8,
    description:
      "Des cours encore plus abordables pour les vrais débutants  Ce cours est gratuit avec votre abonnement Cambly",
    title: "L'anglais pour voyager (partie 2)",
    level: "debutant 10 cours",
  },
];
const developpement = [
  {
    imageSrc: cours1,
    description:
      "Des cours encore plus abordables pour les vrais débutants Ce cours est gratuit avec votre abonnement Cambly",
    title: "Anglais des affaires",
    level: "debutant 15 cours",
  },
  {
    imageSrc: cours12,
    description:
      "Exprimez vos idées et opinions Ce cours est gratuit avec votre abonnement Cambly",
    title: "Anglais des affaires Avancé",
    level: "avancée 8 cours",
  },
  {
    imageSrc: cours9,
    description:
      "Explorez les sujets complexes liés à la vie moderne Ce cours est gratuit avec votre abonnement Cambly",
    title: "Atelier : s'entrainer aux présentation",
    level: "avancée 10 cours",
  },
  {
    imageSrc: cours4,
    description:
      "Leçons accessibles aux débutants complets Ce cours est gratuit avec votre abonnement Cambly",
    title: "Atelier : s'entrainer aux entretiens",
    level: "Tous les niveaux 12 cours",
  },
  {
    imageSrc: cours5,
    description:
      "Des cours encore plus abordables pour les vrais débutants  Ce cours est gratuit avec votre abonnement Cambly",
    title: "Le monde passionant des start-ups ",
    level: "debutant 15 cours",
  },
  {
    imageSrc: cours6,
    description:
      "L'anglais pratique à utiliser en voyage!  Ce cours est gratuit avec votre abonnement Cambly",
    title: "Anglais academique ",
    level: "imtermediaire 15 cours (Partie 2)",
  },
  {
    imageSrc: cours7,
    description: "Autre Titre",
    title: "initiation à la prise de parole en public ",
    level: "Tous les niveaux 13 cours",
  },
  {
    imageSrc: cours8,
    description:
      "Des cours encore plus abordables pour les vrais débutants  Ce cours est gratuit avec votre abonnement Cambly",
    title: "Présentation de recherche académiques",
    level: "debutant 10 cours",
  },
];
const Expression = [
  {
    imageSrc: cours1,
    description:
      "Des cours encore plus abordables pour les vrais débutants Ce cours est gratuit avec votre abonnement Cambly",
    title: "La vie à l'ère d'internet ",
    level: "debutant 15 cours",
  },
  {
    imageSrc: cours2,
    description:
      "Exprimez vos idées et opinions Ce cours est gratuit avec votre abonnement Cambly",
    title: "Prendre soin de notre planet",
    level: "avancée 8 cours",
  },
  {
    imageSrc: cours3,
    description:
      "Explorez les sujets complexes liés à la vie moderne Ce cours est gratuit avec votre abonnement Cambly",
    title: "Un esprit sain dans un corps sain",
    level: "avancée 10 cours",
  },
  {
    imageSrc: cours9,
    description:
      "Leçons accessibles aux débutants complets Ce cours est gratuit avec votre abonnement Cambly",
    title: "Film et telivision",
    level: "Tous les niveaux 12 cours",
  },
  {
    imageSrc: cours10,
    description:
      "Des cours encore plus abordables pour les vrais débutants  Ce cours est gratuit avec votre abonnement Cambly",
    title: "Elever des enfants ",
    level: "debutant 15 cours",
  },
  {
    imageSrc: cours11,
    description:
      "L'anglais pratique à utiliser en voyage!  Ce cours est gratuit avec votre abonnement Cambly",
    title: "Cuisine et gastronomie",
    level: "imtermediaire 15 cours (Partie 2)",
  },
  {
    imageSrc: cours12,
    description: "Autre Titre",
    title: "Les jeux olimpiques ",
    level: "Tous les niveaux 13 cours",
  },
];
const Cours: React.FC = () => {
  return (
    <ApprenantLayout>
      <div className="p-9 w-full">
        <div className=" rounded-lg bg-orange-300 p-6 mb-10">
          <div className="text-orange-800 text-3xl font-meduim  ">
            Nous vous accueillons dans notre espace dédié aux supports de cours
          </div>
          <div className="flex items-center justify-center gap-8 py-10">
            <div className="flex gap-3">
                <img src={person} alt="person" className="h-14 w-14" />
              <div className="flex-cols p-3">
                <div className="text-orange-800 text-lg font-meduim ">
                  Vous ne souhaitez pas utiliser de support
                </div>
                <div className="jomla 2">
                  Vous et votre tuteur pouvez choisir vos propres sujets, ou
                  discuter librement
                </div>
              </div>
            </div>
            <div className="flex gap-3">
                <img src={book} alt="book" className="h-14 w-14" />
              <div className="flex-cols p-3">
                <div className="text-orange-800 text-lg font-meduim  ">
                  Vous cherchez des supports pour vous orienter dans vos cours ?
                </div>
                <div className="jomla 2">
                  Faites votre choix parmi nos propositions de sujets
                  ci-dessous.
                </div>
              </div>
            </div>
          </div>
          <button className="mx-auto items-center justify-center flex p-4 rounded-lg bg-orange-400 px-10 w-max hover:bg-orange-500">
            <div className="uppercase text-lg font-meduim text-white font-korto font-sans">
              j'ai compris
            </div>
          </button>
        </div>
        <div className="text-left font-korto font-sans w-2/3 ">
          <div className="font-semibold text-3xl mb-7 tracking-tight">
            Explorer les documents de cours{" "}
          </div>
          <div className="block space-y-3">
            <div className="font-meduim text-3xl tracking-tight ">
              Les fondements de l'apprentissage de l'anglais
            </div>
            <div className="text-xl font-normal">
              Gagnez en confiance et perfectionnez votre anglais
              conversationnel. Que vous soyez débutant ou avancé, nos cours
              couvrent tous les niveaux de compétence et abordent une variété de
              sujets, de la conversation de base à l'expression d'opinions
              éclairées sur des sujets d'actualité complexes
            </div>
          </div>
        </div>
        {/* grid */}
        <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-4 p-2 xl:py-5 ">
          {anglais.map((item, index) => (
            <Card className="max-w-[20rem] overflow-hidden ">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img src={item.imageSrc} alt="cours" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className=" text-orange-600">
                  {item.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-sm"
                >
                  {item.description}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between mx-auto">
                <Typography className="font-normal">{item.level}</Typography>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-left font-korto font-sans w-2/3 mt-10">
          <div className="block space-y-3">
            <div className="font-meduim text-3xl tracking-tight ">
              Développement professionnel
            </div>
            <div className="text-xl font-normal">
              La communication professionnelle dans un contexte international
              demande bien plus qu'une maîtrise solide de l'anglais. Une
              communication interculturelle efficace, à la fois verbale et
              non-verbale, est un élément clé pour prendre votre envolée
              professionnelle
            </div>
          </div>
        </div>
        {/* grid */}
        <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-4 p-2 xl:py-5 mt-8">
          {developpement.map((item, index) => (
            <Card className="max-w-[20rem] overflow-hidden ">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img src={item.imageSrc} alt="cours" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className=" text-orange-600">
                  {item.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-sm"
                >
                  {item.description}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <Typography className="font-normal">{item.level}</Typography>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="text-left font-korto font-sans w-2/3 mt-10">
          <div className="block space-y-3">
            <div className="font-meduim text-3xl tracking-tight ">
              Exprimez-vous
            </div>
            <div className="text-xl font-normal">
              Apprendre l'anglais est le meilleur moyen de nouer des relations
              avec des personnes du monde entier. Explorez une grande variété de
              sujets d'actualité tout en élargissant votre vocabulaire lié à des
              domaines spécifiques et découvrez d'autres cultures et
              perspectives en cours de route !
            </div>
          </div>
        </div>
        {/* grid */}
        <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-4 p-2 xl:py-5 mt-8">
          {Expression.map((item, index) => (
            <Card className="max-w-[20rem] overflow-hidden ">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img src={item.imageSrc} alt="cours" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className=" text-orange-600">
                  {item.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="gray"
                  className="mt-3 font-normal text-sm"
                >
                  {item.description}
                </Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between mx-auto">
                <Typography className="font-normal">{item.level}</Typography>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </ApprenantLayout>
  );
};

export default Cours;
