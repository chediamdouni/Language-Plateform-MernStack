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
      <div className="px-8 text-center">
        <Typography color="blue-gray" className="mb-6 font-korto">
          Ce que j'aime chez Cambly c est la diversité des tuteurs ! Je peux
          parler avec des personnes du monde entier, choisir quelqu'un qui
          travaille dans le même domaine que moi, ou qui partage ma passion pour
          le voyage. J'ai beaucoup progressé grâce à la plateforme
        </Typography>
        <Avatar
          src={
            image ||
            "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          }
          alt="image"
          size="lg"
        />
        <Typography variant="h6" className="mt-4">
          {name || "Tania Andrew"}
        </Typography>
        <Typography color="gray" className="mb-4 font-normal">
          {description || "Lead Frontend Developer"}
        </Typography>
        <Rating value={rating || 5} readonly />
      </div>
    </Reveal>
  );
}
