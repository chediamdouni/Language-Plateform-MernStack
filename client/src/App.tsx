import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
//import Dashboard from './pages/dashboard'
import Home from "./pages/home";
import { LoginApprenant, LoginTuteur } from "./pages/Login";
import Signup from "./pages/apprenant/Signup";
import DashboardApprenant from "./pages/dashboardApprenant";
import ProfileApprenant from "./pages/apprenant/ProfileApprenant";
import Cours from "./pages/Cours";
import Pricing from "./pages/Pricing";
import SignupTuteur from "./pages/tuteur/Signup";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cour" element={<Cours />} />
      <Route path="/tuteur-signup" element={<SignupTuteur/>}></Route>
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/apprenant" element={<DashboardApprenant />} />
      <Route path="/profile-apprenant" element={<ProfileApprenant />} />
      <Route path="/login-apprenant" element={<LoginApprenant />} />
      <Route path="/login-tuteur" element={<LoginTuteur />} />
      <Route path="/Signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
