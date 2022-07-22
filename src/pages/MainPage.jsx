// react libraries //
import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "../utils/context";

// axios //
import { getCall } from "../utils/api-calls";
import { CHANNELS_ENDPOINT, USERS_ENDPOINT } from "../utils/api-urls";

// components //
import Loading from "../components/Loading";
import Navbar from "../components/main-functionalities/navs/Navbar";
import Sidebar from "../components/main-functionalities/navs/Sidebar";
import NewChannel from "../components/main-functionalities/navs/NewChannel";
import MessageSidebar from "../components/main-functionalities/message/MessageSidebar";
import Messages from "../components/main-functionalities/message/Messages";
import NewMessage from "../components/main-functionalities/navs/NewMessage";

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
            path="welcome"
            element={
              <div
                className={
                  showMobile === false
                    ? "main-content"
                    : "main-content main-content-closed"
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
          />
          <Route path=":type/:id" element={<Messages />} />
          <Route path="new-message" element={<NewMessage />} />
          <Route path="*" element={<Navigate to="welcome" replace />} />
        </Routes>

        <MessageSidebar />
      </div>
    );
  }
}

export default MainPage;
