// scss //
import "./assets/scss/styles.css";

// react libraries //
import React, { useContext } from "react";
import { UserContext } from "./utils/context";
import { Routes, Route } from "react-router-dom";

// components //
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// pages //
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";
import Login from "./components/login-functionalities/Login";
import Register from "./components/login-functionalities/Register";

// app //
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/landing"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        >
          <Route path="login" />
          <Route path="register" />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
      {/* {isLoggedIn === false && <LandingPage />}
      {isLoggedIn === true && <MainPage />} */}

      {/* <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />

          <Route
            path={"/l/"}
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Router> */}

      {/* {isLoggedIn === false && (
            <Route path="/login" element={<LandingPage />} />
          )}
          {isLoggedIn === true && <Route path="/main" element={<MainPage />} />} */}
    </div>
  );
}

export default App;
