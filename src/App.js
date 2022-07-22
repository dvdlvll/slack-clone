// scss //
import "./assets/scss/styles.css";

// react libraries //
import React, { useContext } from "react";
import { UserContext } from "./utils/context";
import { Routes, Route, Navigate } from "react-router-dom";

// components //
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

// pages //
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";

// app //
function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/main"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MainPage />
            </PrivateRoute>
          }
        >
          <Route path="welcome" />
          <Route path=":type/:id" />
          <Route path="new-message" />
        </Route>

        <Route
          path="/landing"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <LandingPage />
            </PublicRoute>
          }
        >
          <Route path="login" />
          <Route path="register" />
        </Route>

        <Route path="/" element={<Navigate to="/landing" />} />
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
