// scss //
import "./assets/scss/styles.css";

// react libraries //
import React, { useContext } from "react";
import { UserContext } from "./utils/context";

// pages //
import LandingPage from "./pages/LandingPage";
import MainPage from "./pages/MainPage";

// app //
function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="App">
      {isLoggedIn === false && <LandingPage />}
      {isLoggedIn === true && <MainPage />}

      {/* {isLoggedIn === false && (
            <Route path="/login" element={<LandingPage />} />
          )}
          {isLoggedIn === true && <Route path="/main" element={<MainPage />} />} */}
    </div>
  );
}

export default App;
