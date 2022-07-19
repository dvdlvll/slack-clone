// react libraries //
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserContext } from "../utils/context";

// components //
import Navbar from "../components/main-functionalities/Navbar";
import Sidebar from "../components/main-functionalities/Sidebar";

function MainPage() {
  // context //
  const {
    //   showNewChannelModal,
    //   setShowNewChannelModal,
    showMobile,
    //   showChatInfo,
  } = useContext(UserContext);

  return (
    // <div className="main-container">
    //   show modal to create new channel
    //   {showModal ? (
    //     <NewChannel
    //       showNewChannelModal={showNewChannelModal}
    //       setShowNewChannelModal={setShowNewChannelModal}
    //     />
    //   ) : null}

    //   {/* nav bars */}
    <div
      className={
        showMobile
          ? "nav-bars-container nav-bars-container-closed"
          : "nav-bars-container"
      }
    >
      <Navbar />
      <Sidebar />
    </div>

    //   {/* main content */}
    // <Router>
    //   <Routes>
    //     <Route path="/" exact>
    //       <div
    //         className={
    //           !showMobile
    //             ? "main-content main-content-closed"
    //             : showChatInfo
    //             ? "main-content main-content-closed"
    //             : "main-content"
    //         }
    //       >
    //         <div className="message-container-empty">
    //           <span className="empty-title">
    //             Welcome back, {removeEmail(currentUser.email)}!
    //           </span>
    //           <p>Send a message or choose a contact to get started.</p>
    //         </div>
    //       </div>
    //     </Route>
    //   </Routes>
    // </Router>
    // </div>
  );
}

export default MainPage;
