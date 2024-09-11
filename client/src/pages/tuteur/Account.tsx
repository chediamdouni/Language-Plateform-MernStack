import React, { useContext, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TuteurLayout from "src/layouts/TuteurLayout";
import axios from "axios";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";

const TuteurSettingsAccount = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const initialValues = {
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    email: Yup.string().email("Email invalide").required("L'email est requis"),
    password: Yup.string().min(
      6,
      "Le mot de passe doit contenir au moins 6 caractères"
    ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe doivent correspondre")
      .when("password", {
        is: (val: string) => val && val.length > 0,
        then: (schema) =>
          schema.required("La confirmation du mot de passe est requise"),
      }),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const data = {
        username: values.username,
        email: values.email,
        password: values.password || undefined,
      };

      const res = await axios.put(
        `http://localhost:5000/api/users/editUserProfile/${user?.id || ""}`,
        data
      );
      console.log("Form Data:", data);
      updateUser(res.data);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TuteurLayout>
      <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center text-blue-400"
          >
            Paramètres du compte
          </motion.h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-gray-800 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    <FiUser className="inline-block mr-2" />
                    Nom d'utilisateur
                  </label>
                  <Field
                    type="text"
                    name="username"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="Nom d'utilisateur"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    <FiMail className="inline-block mr-2" />
                    Adresse email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    <FiLock className="inline-block mr-2" />
                    Nouveau mot de passe
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="Laissez vide pour ne pas changer"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    <FiLock className="inline-block mr-2" />
                    Confirmer le nouveau mot de passe
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
                    placeholder="Confirmer le mot de passe"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs italic mt-1"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                  >
                    {isSubmitting ? "Mise à jour..." : "Mettre à jour"}
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>

          {updateSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 p-4 bg-green-500 text-white rounded-md flex items-center justify-center"
            >
              <FiCheck className="mr-2" />
              Mise à jour réussie !
            </motion.div>
          )}
        </div>
      </div>
    </TuteurLayout>
  );
};

export default TuteurSettingsAccount;
