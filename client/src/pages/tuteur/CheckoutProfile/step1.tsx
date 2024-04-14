import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineGlobal } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import person from "../../../assets/images/default.png";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
const Step1 = () => {
  const initialValues = {
    aboutMe: "",
    certificate: "",
    experience: "",
  };

  const validationSchema = Yup.object({
    description: Yup.string().required("La description est requise"),
    workExperience: Yup.string().required(
      "L'expérience professionnelle est requise"
    ),
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post("", values);
      console.log("Form submitted successfully:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [description, setShowDescription] = useState(false);
  const [experience, setShowExperience] = useState(false);

  return (
    <div className="font-korto font-sans w-5/6 mx-auto p-6">
      <div className="text-2xl ">LearnUp Tuteur Profile</div>
      <div className="divide-y ">
        <div className="space-y-5 p-4">
          <div className="text-lg">
            Votre profil de tuteur vous permet de vous faire connaître auprès
            des étudiants sur LearnUp. Suivez les conseils ci-dessous pour vous
            assurer que votre profil est complet avant de le soumettre.
          </div>
          <div className="text-lg">
            Veuillez ne pas inclure d'informations de contact personnelles dans
            votre profil car cela pourrait retarder votre candidature. Vous
            pouvez revenir sur cette page pour modifications à tout moment.
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11">
              <img src={person} alt="person" className="h-full w-full" />
            </div>
            <div>
              <div className="font-semibold text-xl">Chedi Amdouni</div>
              <div className="flex gap-3 items-center my-3">
                <div className="flex items-center gap-2 text-base text-gray-400">
                  <AiOutlineGlobal />
                  Accent britannique standard
                </div>
                <div className="flex items-center gap-1 rounded-full p-1 bg-orange-200 text-xs text-center">
                  <FaStar />
                  Nouveau talent
                </div>
              </div>
              <button className="flex mt-4 text-base text-gray-500 gap-1">
                Modifier les infos de base <MdModeEdit />
              </button>
            </div>
          </div>
        </div>
        <div className=" mx-auto w-5/6 flex justify-center items-center text-center p-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-3 font-korto font-sans">
                <div className="flex flex-col space-y-4">
                  <label htmlFor="aboutMe" className="text-gray-400 text-xl">
                    Dites bonjour et présentez-vous aux étudiants ! Ce sera la
                    première chose que les étudiants liront sur vous lorsqu'ils
                    de leur tuteur
                  </label>
                  <Field
                    id="aboutMe"
                    name="aboutMe"
                    placeholder="A propos de toi"
                    className="w-auto border-2 rounded-xl text-gray-900 text-center mx-auto font-semibold p-3"
                    onClick={() => setShowModal(true)}
                    readOnly
                  />
                  <ErrorMessage name="aboutMe" component="div" />
                </div>
                <div className="flex flex-col space-y-4">
                  <label
                    htmlFor="description"
                    className="text-gray-400 text-xl"
                  >
                    C'est l'endroit idéal pour ajouter tout ce que vous aimeriez
                    que vos élèves sachent sur vous. Inclure vos loisirs, vos
                    centres d'intérêt et les endroits où vous avez voyagé est un
                    excellent moyen de trouver des étudiants qui partagent des
                    points communs. de trouver des étudiants qui partagent des
                    points communs
                  </label>
                  <Field
                    id="description"
                    name="description"
                    placeholder="Decris toi"
                    className="w-auto border-2 rounded-xl mx-auto text-gray-900 text-center font-semibold p-3"
                    onClick={() => setShowModal(true)}
                    readOnly
                  />
                  <ErrorMessage name="description" component="div" />
                </div>
                <div className="flex flex-col space-y-4">
                  <label
                    htmlFor="workExperience"
                    className="text-gray-400 text-xl"
                  >
                    Expérience professionnelle :
                  </label>
                  <Field
                    id="workExperience"
                    name="workExperience"
                    placeholder="Vos Experiences"
                    className="w-auto border-2 rounded-xl mx-auto text-gray-900 text-center font-semibold p-3"
                    onClick={() => setShowModal(true)}
                    readOnly
                  />
                  <ErrorMessage name="workExperience" component="div" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl text-center flex place-items-end bg-blue-300 p-3 w-auto "
                >
                  <Link to={"/"}>Soumettre</Link>
                </button>
              </Form>
            )}
          </Formik>

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Ajouter une description
                </h2>
                <textarea
                  className="w-full border rounded-lg p-2"
                  placeholder=""
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}
          {description && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Ajouter une Brieve description
                </h2>
                <textarea
                  className="w-full border rounded-lg p-2"
                  placeholder="Ajouter une description"
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                    onClick={() => setShowDescription(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowDescription(false)}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}
          {experience && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
              <div className="bg-white p-4 rounded-md w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Ajouter Votre Experience
                </h2>
                <textarea
                  className="w-full border rounded-lg p-2"
                  placeholder="Ajouter vos attestations"
                  rows={4}
                ></textarea>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                    onClick={() => setShowExperience(false)}
                  >
                    Annuler
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowExperience(false)}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Step1;
