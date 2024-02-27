import Aside from "../../components/aside";
import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
const SignupChecklistComponent = () => {
  return (
    <TuteurLayout>
    <Aside />
    <div className="p-4 sm:ml-80">
      <div>Sign up checklist tutor </div>
    </div>
  </TuteurLayout>
  );
};
export default SignupChecklistComponent;
