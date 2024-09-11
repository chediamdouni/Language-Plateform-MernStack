import React, { useContext } from "react";
import EditForm from "../../components/EditForm";
import { AuthContext } from "../../Context/AuthContext";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import FooterWithLogo from "../../components/footer";

const EditApprenant = () => {
  const { user } = useContext(AuthContext);

  const handleSave = () => {
    console.log("Profil mis à jour avec succès");
  };

  return (
    <ApprenantLayout>
      <div className="container mx-auto px-8 py-8">
        {user ? (
          <EditForm user={user} onSave={handleSave} />
        ) : (
          <p>Chargement du profil utilisateur...</p>
        )}
      </div>
      <FooterWithLogo />
    </ApprenantLayout>
  );
};

export default EditApprenant;
