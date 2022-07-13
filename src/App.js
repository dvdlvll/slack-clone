import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/landing-page";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/channel" />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
