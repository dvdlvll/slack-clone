import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login";
import LandingHero from "../components/LandingHero";

function LandingPage() {
  return (
    <div className="landing-container">
      <LandingHero />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default LandingPage;
