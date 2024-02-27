import Aside from "../../components/aside";
import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
const BecomeTutorComponent = () => {
  return (
    <TuteurLayout>
      <Aside />
      <div className="p-4 sm:ml-80">
        <div>become a tutor </div>
      </div>
    </TuteurLayout>
  );
};
export default BecomeTutorComponent;
