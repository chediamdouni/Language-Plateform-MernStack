import React, { useState, FormEvent, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { AuthContext } from "src/Context/AuthContext";

const apiUrl = process.env.REACT_APP_API_URL;

const CreateCourse: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [titre, setTitre] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categorie, setCategorie] = useState<string>("Développement personnel");
  const [prix, setPrix] = useState<number>(0);
  const [prompts, setPrompts] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  const setFileToBase = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setImage(file);
      }
    };
  };
  const handleDrop = (acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("categorie", categorie);
    formData.append("prix", prix.toString());
    formData.append("prompts", prompts);
    formData.append("tuteur", user?.id || "");
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(`${apiUrl}/courses/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/courses/${response.data.course._id}`);
    } catch (error) {
      console.error("Erreur lors de la création du cours", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-2xl shadow-xl p-8 text-white"
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-400">
        Créer un Nouveau Cours
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Titre du cours
          </label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Catégorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="Développement personnel">
              Développement personnel
            </option>
            <option value="Exprimez-vous">Exprimez-vous</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prompts</label>
          <select
            value={prompts}
            onChange={(e) => setPrompts(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
          >
            <option value="" disabled>
              Sélectionnez un prompt
            </option>
            <option value="CréationInnovante">CréationInnovante</option>
            <option value="DéveloppementPersonnel">
              DéveloppementPersonnel
            </option>
            <option value="Connaissances Continues">
              Connaissances Continues
            </option>
            <option value="Communication Efficace">
              Communication Efficace
            </option>
            <option value="RésolutionProblèmes">RésolutionProblèmes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Prix (€)</label>
          <input
            type="number"
            value={prix}
            onChange={(e) => setPrix(parseFloat(e.target.value))}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Image du cours
          </label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-500 bg-opacity-10"
                : "border-gray-600 hover:border-blue-500"
            }`}
            onChange={handleImage}
          >
            <input {...getInputProps()} />
            {image ? (
              <p>{image.name}</p>
            ) : (
              <p>
                Glissez et déposez une image ici, ou cliquez pour sélectionner
                un fichier
              </p>
            )}
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
        >
          Créer le cours
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateCourse;
