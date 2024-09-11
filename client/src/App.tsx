import "./App.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import { LoginApprenant, LoginTuteur } from "./pages/Auth/Login";
import Signup from "./pages/apprenant/Signup";
import ProfileApprenant from "./pages/apprenant/ProfileApprenant";
import Cours from "./pages/Cours";
import Pricing from "./pages/Pricing";
import SignupTuteur from "./pages/tuteur/Signup";
import CoursTuteur from "./pages/tuteur/Cours";
import AccountSettings from "./pages/tuteur/AccountSettings";
import LoginMethods from "./pages/tuteur/LoginMethods";
import Settings from "./pages/tuteur/Settings";
import TuteurProfile from "./pages/apprenant/tuteurProfile";
import WelcomeComponent from "./pages/tuteur/welcome";
import NotFound from "./pages/NotFound";
import TuteurSettingsAccount from "./pages/tuteur/Account";
import TestingRoom from "./pages/react-stream/TestingRoom";
import Meeting from "./pages/react-stream/Meet";
import StreamVideoProvider from "./providers/StreamClientProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Contact from "./pages/Contact";
import Contactdefault from "./pages/Contactdefault";
import DashboardApprenant from "./pages/apprenant/dashboardApprenant";
import Inbox from "./pages/Inbox";
import { InboxTuteur } from "./pages/InboxTuteur";
import { NewChannel } from "./pages/newChannel";
import CreateCourse from "./pages/Courses/CreateCourse";
import CourseDetails from "./pages/Courses/CourseDetails";
import DisplayCourse from "./pages/Courses/DisplayCourse";
import LessonList from "./pages/Courses/LessonList";
import DisplayAllCourses from "./pages/Courses/displayAllCourses";
import UpdateCourse from "./pages/Courses/updateCourse";
import Favorites from "./pages/apprenant/Favorites";
import VerifyEmail from "./pages/Auth/EmailVerify";
import GoogleAuthCallback from "./pages/Auth/GoogleAuthCallback ";
import EditApprenant from "./pages/apprenant/EditProfile";
import EditTutors from "./pages/tuteur/EditProfile";
import DisplayTutorCourse from "./pages/Courses/DisplayTutorCourse";
import Checkout from "./pages/Pricing/Checkout";


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
          <Route path="edit" element={<EditApprenant />} />
          {/* <Route path="tuteur" element={<TuteurProfile />} /> */}
        </Route>
        <Route path="/tuteur">
          <Route index element={<TuteurProfile />} />
          <Route path="inscription" element={<SignupTuteur />} />
          <Route path="connexion" element={<LoginTuteur />} />
          <Route path="edit" element={<EditTutors />} />
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
        {/* <Route path="/create-meeting" element={<CreateMeetingComponent />} />
        <Route
          path="/video-conference"
          element={
            <StreamVideoProvider>
              <TestingRoom />
            </StreamVideoProvider>
          }
        /> */}
        <Route
          path="/apprenant/tuteur/:id"
          element={
            <StreamVideoProvider>
              <TuteurProfile />
            </StreamVideoProvider>
          }
        />
        <Route path="verify-email" element={<VerifyEmail />} />
        <Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/inbox" element={<Inbox />} />
        {/* <Route path="/inbox/tuteur" element={<InboxTuteur />} /> */}
        <Route path="/channel/new" element={<NewChannel />} />
        <Route path="/contact/default" element={<Contactdefault />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cour" element={<Cours />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />}></Route>
        {/* testing */}
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/displayCourses/:id" element={<DisplayCourse />} />
        <Route path="/displayTutorsCourses/:id" element={<DisplayTutorCourse />} />
        <Route path="/courses/:id/lessons" element={<LessonList />} />
        <Route path="/courses/all" element={<DisplayAllCourses />} />
        <Route path="/courses/update/:courseId" element={<UpdateCourse />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
