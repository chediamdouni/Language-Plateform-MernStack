import React, { useContext } from "react";
import EditForm from "../../components/EditForm";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import TuteurLayout from "src/layouts/TuteurLayout";

const EditTutors = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Profil mis à jour avec succès");
    navigate("/tuteur/welcome");
    toast.success("Le profile s'est mis à jour avec succés ");
  };

  return (
    <TuteurLayout>
      {user ? (
        <EditForm user={user} onSave={handleSave} />
      ) : (
        <p>Chargement du profil utilisateur...</p>
      )}
    </TuteurLayout>
  );
};

export default EditTutors;
