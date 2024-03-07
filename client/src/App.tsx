import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import { LoginApprenant, LoginTuteur } from "./pages/Login";
import Signup from "./pages/apprenant/Signup";
import DashboardApprenant from "./pages/apprenant/dashboardApprenant";
import ProfileApprenant from "./pages/apprenant/ProfileApprenant";
import Cours from "./pages/Cours";
import Pricing from "./pages/Pricing";
import SignupTuteur from "./pages/tuteur/Signup";
import CoursTuteur from "./pages/tuteur/Cours";
import AccountSettings from "./pages/tuteur/AccountSettings";
import TuteurAccount from "./pages/tuteur/Account";
import LoginMethods from "./pages/tuteur/LoginMethods";
import Settings from "./pages/tuteur/Settings";
import TuteurProfile from "./pages/tuteur/profile";
import WelcomeComponent from "./pages/tuteur/welcome";
import SignupChecklistComponent from "./pages/tuteur/SignupChecklistComponent";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apprenant">
        <Route index element={<DashboardApprenant />} />
        <Route path="profile" element={<ProfileApprenant />} />
        <Route path="connexion" element={<LoginApprenant />} />
        <Route path="inscription" element={<Signup />} />
      </Route>
      <Route path="/tuteur">
        <Route index element={<TuteurProfile />} />
        <Route path="inscription" element={<SignupTuteur />} />
        <Route path="connexion" element={<LoginTuteur />} />
        <Route path="account" element={<TuteurAccount />} />
        <Route path="profile" element={<TuteurProfile />} />
        <Route path="step/welcome" element={<WelcomeComponent />} />
        {/* <Route path="step/become-tutor" element={<BecomeTutorComponent />} /> */}
        <Route
          path="step/signup-checklist"
          element={<SignupChecklistComponent />}
        />
        <Route path="step/profile" element={<SignupChecklistComponent />} />
        <Route
          path="step/supplemental"
          element={<SignupChecklistComponent />}
        />
        <Route path="step/connection" element={<SignupChecklistComponent />} />
        <Route path="Account-settings" element={<AccountSettings />} />
        <Route path="multiple-connexion" element={<LoginMethods />} />
        <Route path="settings" element={<Settings />} />
        <Route path="cours" element={<CoursTuteur />} />
      </Route>
      <Route path="/contact" element={<Contact />} />
      <Route path="/cour" element={<Cours />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default App;
