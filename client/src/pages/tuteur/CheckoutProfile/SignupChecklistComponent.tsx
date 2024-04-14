import Aside from "../../../components/aside";
import React, { useState } from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
import { Stepper, Step, Button } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import Step1 from "./step1";
const SignupChecklistComponent = () => {
  return (
    <TuteurLayout>
      <Aside />
      <div className="p-4 sm:ml-80">
        <Step1 />
      </div>
    </TuteurLayout>
  );
};
export default SignupChecklistComponent;
