import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";

const CoursTuteur = () => {
  return (
    <TuteurLayout>
      <div className="text-center">Cours</div>
      <div>liste des cours</div>
      <div>ajouter un cours</div>
      <div>liste des etudiants inscrits dans le cours</div>
    </TuteurLayout>
  );
};
export default CoursTuteur;
