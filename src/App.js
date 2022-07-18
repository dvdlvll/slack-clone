// scss //
import "./assets/scss/styles.css";

// react libraries //
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components //

// pages //
import LandingPage from "./pages/LandingPage";

// app //
function App() {
  //   const [isLoggedIn, setIsLoggedIn] = useState(null);

  //   useEffect(() => {
  //     const u = localStorage.getItem("isLoggedIn");
  //     u && JSON.parse(u) ? setIsLoggedIn(true) : setIsLoggedIn(false);
  //   }, []);

  //   useEffect(() => {
  //     localStorage.setItem("isLoggedIn", isLoggedIn);
  //   }, [isLoggedIn]);

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
