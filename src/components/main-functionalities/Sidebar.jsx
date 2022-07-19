import React, { useContext } from "react";
import { UserContext } from "../../utils/context";

import { NavLink } from "react-router-dom";

// components //
import Button from "../Button";
// import ChannelList from "../channel/ChannelList";
// import ContactList from "../contact/ContactList";
// import Pic from '../pic/Pic';
// import Search from '../search/Search';

const Sidebar = () => {
  const {
    sidebarMode,
    logoutFunction,
    currentUser,
    setShowModal,
    setShowContent,
    setShowChatInfo,
  } = useContext(UserContext);

  if (sidebarMode === "dm") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">Direct messages</h1>
        {/* <NavLink
          to="/new-message"
          className="button"
          onClick={() => {
            setShowContent(true);
            setShowChatInfo(false);
          }}
        >
          New message
        </NavLink>
        <ContactList /> */}
      </div>
    );
  } else if (sidebarMode === "channel") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">Channels</h1>

        <Button
          className="button"
          text="Add Channel"
          onClick={() => {
            setShowModal(true);
            setShowChatInfo(false);
          }}
        />

        {/* <ChannelList /> */}
      </div>
    );
  } else if (sidebarMode === "search") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">Search</h1>
        {/* <Search placeholder={"Search for a user"} type="user" /> */}
      </div>
    );
  } else if (sidebarMode === "user") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">User</h1>
        <div className="user-container">
          {/* <Pic id={currentUser.id} name={currentUser.email} /> */}
          <span className="user-email">{currentUser.email}</span>
        </div>
        <Button onClick={logoutFunction} text="Logout" className="button" />
      </div>
    );
  }
};

export default Sidebar;
