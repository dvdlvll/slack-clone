import React, { useContext } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// components //
import Button from "../../Button";
import ChannelList from "./ChannelList";
import ContactList from "./ContactList";
import Photo from "../../Photo";
import Search from "../search/Search";

const Sidebar = () => {
  const {
    sidebarMode,
    logoutFunction,
    currentUser,
    setShowNewChannelModal,
    setShowMobile,
    setShowChatInfo,
  } = useContext(UserContext);

  if (sidebarMode === "dm") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">Direct messages</h1>
        <NavLink
          to="new-message"
          className="button"
          onClick={() => {
            setShowMobile(true);
            setShowChatInfo(false);
          }}
        >
          New message
        </NavLink>
        <ContactList />
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
            setShowNewChannelModal(true);
            setShowChatInfo(false);
          }}
        />
        <ChannelList />
      </div>
    );
  } else if (sidebarMode === "search") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">Search</h1>
        <Search />
      </div>
    );
  } else if (sidebarMode === "user") {
    return (
      <div className="sidebar">
        <h1 className="sidebar-title">User</h1>
        <div className="user-container">
          <Photo id={currentUser.id} name={currentUser.email} />
          <span className="user-email">{currentUser.email}</span>
        </div>
        <Button onClick={logoutFunction} text="Logout" className="button" />
      </div>
    );
  }
};

export default Sidebar;
