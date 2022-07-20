// react libraries //
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserContext } from "../utils/context";

// axios //
import { getCall } from "../utils/api-calls";
import { CHANNELS_ENDPOINT, USERS_ENDPOINT } from "../utils/api-urls";

// components //
import Loading from "../components/Loading";
import Navbar from "../components/main-functionalities/Navbar";
import Sidebar from "../components/main-functionalities/Sidebar";
import NewChannel from "../components/main-functionalities/NewChannel";
import LandingPage from "./LandingPage";

function MainPage() {
  // context //
  const {
    currentHeaders,
    currentUser,
    setChannelList,
    setAllUsers,
    allUsers,
    channelList,
    showNewChannelModal,
    setShowNewChannelModal,
    loadData,
    showMobile,
    showChatInfo,
    removeEmail,
  } = useContext(UserContext);

  const runAPIs = () => {
    let emptyObj = {};

    // set headers //
    let channelListRequest = {
      "access-token": currentHeaders["access-token"],
      client: currentHeaders.client,
      expiry: currentHeaders.expiry,
      uid: currentHeaders.uid,
    };
    let contactListRequest = {
      "access-token": currentHeaders["access-token"],
      client: currentHeaders.client,
      expiry: currentHeaders.expiry,
      uid: currentHeaders.uid,
    };

    // define success and error //
    const onSuccessChannel = (response) => {
      setChannelList(response);
    };
    const onSuccessContacts = (response) => {
      setAllUsers(response);
    };
    const onError = (error) => {
      console.log(error);
    };

    // axios call //
    getCall(
      CHANNELS_ENDPOINT,
      emptyObj,
      channelListRequest,
      onSuccessChannel,
      onError
    );
    getCall(
      USERS_ENDPOINT,
      emptyObj,
      contactListRequest,
      onSuccessContacts,
      onError
    );
  };

  // run the APIs
  useEffect(() => {
    runAPIs();
  }, [loadData]);

  if (!channelList.data || !allUsers) {
    return <Loading />;
  } else {
    return (
      <div className="main-container">
        {/* show modal to create new channel */}
        {showNewChannelModal ? (
          <NewChannel
            showNewChannelModal={showNewChannelModal}
            setShowNewChannelModal={setShowNewChannelModal}
          />
        ) : null}

        {/* nav bars */}
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

        {/* main content */}
        <Routes>
          <Route
            path="/"
            element={
              <div
                className={
                  !showMobile
                    ? "main-content main-content-closed"
                    : showChatInfo
                    ? "main-content main-content-closed"
                    : "main-content"
                }
              >
                <div className="message-container-empty">
                  <span className="empty-title">
                    Welcome back, {removeEmail(currentUser.email)}!
                  </span>
                  <p>Send a message or choose a contact to get started.</p>
                </div>
              </div>
            }
          ></Route>
          <Route path="/:type/:id" element={<LandingPage />} />
          <Route exact path="/new-message" element={<LandingPage />} />
        </Routes>
      </div>
    );
  }
}

export default MainPage;
