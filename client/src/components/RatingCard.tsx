import React from "react";
import { Typography, Avatar, Rating } from "@material-tailwind/react";
import Reveal from "../utils/Reveal";
interface Props {
  image?: string;
  name?: string;
  description?: string;
  rating?: number;
}
export function RatingWithComment(props: Props) {
  const { image, name, description, rating } = props;

  return (
    <Reveal>
      <div className="p-8 text-center bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <Typography
          color="blue-gray"
          className="mb-6 font-korto text-lg leading-relaxed"
        >
          Ce que j'aime chez Cambly c'est la diversité des tuteurs ! Je peux
          parler avec des personnes du monde entier, choisir quelqu'un qui
          travaille dans le même domaine que moi, ou qui partage ma passion pour
          le voyage. J'ai beaucoup progressé grâce à la plateforme.
        </Typography>
        <Avatar
          src={
            image ||
            "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          }
          alt="image"
          size="xl"
          className="mx-auto mb-4"
        />
        <Typography variant="h6" className="mt-4 font-bold text-blue-600">
          {name || "Tania Andrew"}
        </Typography>
        <Typography color="gray" className="mb-4 font-normal text-sm">
          {description || "Lead Frontend Developer"}
        </Typography>
        <Rating
          className="text-yellow-500 flex items-center justify-center"
          value={rating || 5}
          readonly
        />
      </div>
    </Reveal>
  );
}
