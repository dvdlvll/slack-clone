import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// components //
import Register from "../components/login-functionalities/Register";
import Login from "../components/login-functionalities/Login";
import LandingHero from "../components/login-functionalities/LandingHero";

function LandingPage() {
  return (
    <div className="landing-container">
      <LandingHero />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LandingPage;
