// scss //
import "./assets/scss/styles.css";

// react libraries //
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";

// components //
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// styled components //
const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 55px auto;

  background: pink;
`;

const Main = styled.div`
  background: white;

  display: grid;
  grid-template-columns: 260px auto;
`;

// app //
function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Header />
          <Main>
            <Sidebar />
            <Routes>
              <Route path="/channel" element={<Chat />} />
              <Route path="/" element={<Register />} />
            </Routes>
          </Main>
        </Container>
      </Router>
    </div>
  );
}

export default App;
