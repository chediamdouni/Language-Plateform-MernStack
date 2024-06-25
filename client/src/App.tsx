import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import LoginMethods from "./pages/tuteur/LoginMethods";
import Settings from "./pages/tuteur/Settings";
import TuteurProfile from "./pages/tuteur/tuteurProfile";
import WelcomeComponent from "./pages/tuteur/welcome";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import TuteurSettingsAccount from "./pages/tuteur/Account";
import TestingRoom from "./pages/react-stream/TestingRoom";
import Meeting from "./pages/react-stream/Meet";
import StreamVideoProvider from "./providers/StreamClientProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Test from "./pages/Test";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apprenant">
          <Route index element={<DashboardApprenant />} />
          <Route path="profile" element={<ProfileApprenant />} />
          <Route path="connexion" element={<LoginApprenant />} />
          <Route path="inscription" element={<Signup />} />
          {/* <Route path="tuteur" element={<TuteurProfile />} /> */}
        </Route>
        <Route path="/tuteur">
          <Route index element={<TuteurProfile />} />
          <Route path="inscription" element={<SignupTuteur />} />
          <Route path="connexion" element={<LoginTuteur />} />
          {/* <Route path="profile" element={<TuteurProfile />} /> */}
          <Route
            path="welcome"
            element={
              <StreamVideoProvider>
                <WelcomeComponent />
              </StreamVideoProvider>
            }
          />
          <Route path="Account-settings" element={<AccountSettings />} />
          <Route path="account" element={<TuteurSettingsAccount />} />
          <Route path="multiple-connexion" element={<LoginMethods />} />
          <Route path="settings" element={<Settings />} />
          <Route path="cours" element={<CoursTuteur />} />
        </Route>
        <Route
          path="/meeting/:id"
          element={
            <StreamVideoProvider>
              <Meeting />
            </StreamVideoProvider>
          }
        />
        {/* <Route path="/create-meeting" element={<CreateMeetingComponent />} /> */}
        <Route
          path="/video-conference"
          element={
            <StreamVideoProvider>
              <TestingRoom />
            </StreamVideoProvider>
          }
        />
        <Route
          path="/apprenant/tuteur/:id"
          element={
            <StreamVideoProvider>
              <TuteurProfile />
            </StreamVideoProvider>
          }
        />
        <Route
          path="/test"
          element={
            <StreamVideoProvider>
              <Test />
            </StreamVideoProvider>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cour" element={<Cours />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
