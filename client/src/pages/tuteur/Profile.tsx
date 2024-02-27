import Aside from "../../components/aside";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TuteurLayout from "src/layouts/TuteurLayout";
import BecomeTutorComponent from "./BecomeTutorComponent";
import WelcomeComponent from "./welcome";
import SignupChecklistComponent from "./SignupChecklistComponent";

const TuteurProfile = () => {
  return (
    <TuteurLayout>
        <Aside />
        <div className="p-4 sm:ml-80">
         
        </div>
    </TuteurLayout>
  );
};
export default TuteurProfile;
