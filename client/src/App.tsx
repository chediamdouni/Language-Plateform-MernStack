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
import TuteurProfile from "./pages/tuteur/profile";
import WelcomeComponent from "./pages/tuteur/welcome";
import SignupChecklistComponent from "./pages/tuteur/CheckoutProfile/SignupChecklistComponent";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Step1 from "./pages/tuteur/CheckoutProfile/step1";
import Step2 from "./pages/tuteur/CheckoutProfile/step2";
import Step3 from "./pages/tuteur/CheckoutProfile/step3";
import TuteurSettingsAccount from "./pages/tuteur/Account";
import Video from "./pages/react-stream/video";
import MeetingRoom from "./pages/react-stream/MeetingRoom";
import TestingRoom from "./pages/react-stream/TestingRoom";
import Meeting from "./pages/react-stream/Meet";
import { AuthProvider } from "./Context/AuthContext";
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
          <Route
            path="profile"
            element={
              <StreamVideoProvider>
                <ProfileApprenant />
              </StreamVideoProvider>
            }
          />
          <Route path="connexion" element={<LoginApprenant />} />
          <Route path="inscription" element={<Signup />} />
          <Route path="tuteur" element={<TuteurProfile />} />
        </Route>
        <Route path="/tuteur">
          <Route index element={<TuteurProfile />} />
          <Route path="inscription" element={<SignupTuteur />} />
          <Route path="connexion" element={<LoginTuteur />} />
          <Route path="profile" element={<TuteurProfile />} />

          <Route path="step/welcome" element={<WelcomeComponent />} />
          <Route path="step/signup-checklist">
            <Route index element={<SignupChecklistComponent />} />
            <Route path="step-1" element={<Step1 />} />
            <Route path="step-2" element={<Step2 />} />
            <Route path="step-3" element={<Step3 />} />
          </Route>

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
