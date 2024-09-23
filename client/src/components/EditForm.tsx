import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { User } from "src/Context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaBirthdayCake,
  FaVenusMars,
  FaImage,
  FaInfoCircle,
  FaBriefcase,
  FaLanguage,
  FaGlobe,
} from "react-icons/fa";
import TuteurLayout from "src/layouts/TuteurLayout";

interface EditFormProps {
  user: User;
  onSave: () => void;
}
const countries = [
  "France",
  "États-Unis",
  "Canada",
  "Royaume-Uni",
  "Allemagne",
  "Japon",
  "Australie",
  "Brésil",
  "Inde",
  "Chine",
  // Ajoutez d'autres pays selon vos besoins
];

const languages = [
  "Français",
  "Anglais",
  "Espagnol",
  "Allemand",
  "Italien",
  "Portugais",
  "Chinois",
  "Japonais",
  "Arabe",
  "Hindi",
  // Ajoutez d'autres langues selon vos besoins
];

const apiUrl = process.env.REACT_APP_API_URL;

const EditForm: React.FC<EditFormProps> = ({ user, onSave }) => {
  const { updateUser } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatDate = (date: Date | string | undefined): string => {
    if (!date) return "";
    if (date instanceof Date) {
      return date.toISOString().split("T")[0];
    }
    if (typeof date === "string") {
      return new Date(date).toISOString().split("T")[0];
    }
    return "";
  };

  const initialValues = {
    username: user.username || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
    dateOfBirth: formatDate(user.dateOfBirth),
    gender: user.gender || "homme",
    aboutMe: user.aboutMe || "",
    experience: user.experience || "",
    language: user.language || "",
    country: user.country || "",
    profileImage: null as File | null,
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nom d'utilisateur requis"),
    email: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string().min(
      6,
      "Le mot de passe doit comporter au moins 6 caractères"
    ),
    /*confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
      .required("Confirmation du mot de passe requise"),*/
    dateOfBirth: Yup.date().nullable(),
    gender: Yup.string().oneOf(["homme", "femme", "autre"], "Genre invalide"),
    profileImage: Yup.mixed().test(
      "fileSize",
      "Le fichier est trop volumineux",
      (value) => {
        if (!value || !(value instanceof File)) return true;
        return value.size <= 5 * 1024 * 1024;
      }
    ),
    aboutMe: Yup.string(),
    experience: Yup.number()
      .positive("L'expérience doit être un nombre positif")
      .integer("L'expérience doit être un nombre entier"),
    language: Yup.string(),
    country: Yup.string(),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: any
  ) => {
    setIsSubmitting(true);
    const updatedUser = {
      username: values.username,
      email: values.email,
      password: values.password || undefined,
      dateOfBirth: values.dateOfBirth
        ? new Date(values.dateOfBirth)
        : undefined,
      gender: values.gender,
      profileImage: values.profileImage,
      aboutMe: values.aboutMe,
      experience: values.experience ? Number(values.experience) : undefined,
      language: values.language,
      country: values.country,
    };
    console.log("Birth", values.dateOfBirth);

    const formData = new FormData();
    Object.entries(updatedUser).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (key === "dateOfBirth" && value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (key === "profileImage" && value instanceof File) {
          formData.append("image", value, value.name);
        } else if (key !== "profileImage") {
          formData.append(key, String(value));
        }
      }
    });

    try {
      await axios.put(
         `${apiUrl}/users/editUserProfile/${user.id}`,
        formData
      );

      updateUser(formData);
      onSave();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFieldValue("profileImage", file); // Mettre à jour seulement si une image est sélectionnée
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className=" h-full w-full flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-white mb-6 text-center">
          Modifier votre profil
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting: formikIsSubmitting, setFieldValue }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Nom d'utilisateur
                  </label>
                  <div className="relative">
                    <FaUser className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      type="text"
                      name="username"
                      id="username"
                      className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 block transition duration-150 ease-in-out text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 block transition duration-150 ease-in-out text-gray-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    placeholder="Laissez vide pour ne pas changer"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date de Naissance
                  </label>
                  <div className="relative">
                    <FaBirthdayCake className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Genre
                  </label>
                  <div className="relative">
                    <FaVenusMars className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      as="select"
                      name="gender"
                      id="gender"
                      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    >
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                      <option value="autre">Autre</option>
                    </Field>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="profileImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Photo de profil
                </label>
                <div className="relative">
                  <FaImage className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={(event) => {
                      handleImageChange(event, setFieldValue);
                      setFieldValue(
                        "profileImage",
                        event.currentTarget.files?.[0] || null
                      );
                    }}
                    ref={fileInputRef}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  />
                </div>
                <ErrorMessage
                  name="profileImage"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mt-4 max-w-xs h-auto rounded-lg shadow-md"
                  />
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="aboutMe"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  À Propos de Moi
                </label>
                <div className="relative">
                  <FaInfoCircle className="absolute top-3 left-3 text-gray-400" />
                  <Field
                    as="textarea"
                    name="aboutMe"
                    id="aboutMe"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                    placeholder="Parlez-nous de vous"
                    rows={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Expérience
                  </label>
                  <div className="relative">
                    <FaBriefcase className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      type="number"
                      name="experience"
                      id="experience"
                      className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 block transition duration-150 ease-in-out text-gray-900 dark:text-white"
                      placeholder="Années"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="language"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Langue
                  </label>
                  <div className="relative">
                    <FaLanguage className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      as="select"
                      name="language"
                      id="language"
                      className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 block transition duration-150 ease-in-out text-gray-900 dark:text-white"
                    >
                      <option value="">Sélectionnez une langue</option>
                      {languages.map((lang) => (
                        <option key={lang} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Pays
                  </label>
                  <div className="relative">
                    <FaGlobe className="absolute top-3 left-3 text-gray-400" />
                    <Field
                      as="select"
                      name="country"
                      id="country"
                      className="pl-10 w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 block transition duration-150 ease-in-out text-gray-900 dark:text-white"
                    >
                      <option value="">Sélectionnez un pays</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                  </div>
                </div>
              </div>

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="mt-4 max-w-xs h-auto rounded-lg shadow-md"
                />
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={formikIsSubmitting || isSubmitting}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Chargement..."
                    : "Enregistrer les modifications"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditForm;
