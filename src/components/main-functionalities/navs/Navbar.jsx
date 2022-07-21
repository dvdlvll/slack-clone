// react libraries //
import React, { useContext } from "react";
import { UserContext } from "../../../utils/context";

// material ui //
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SearchIcon from "@mui/icons-material/Search";

// components //
import Photo from "../../Photo";

// component //
const Navbar = () => {
  const { currentUser, setSidebarMode, sidebarMode, handleSetLoadData } =
    useContext(UserContext);

  return (
    <nav>
      <div className="navlink-container">
        <button
          className={
            sidebarMode === "dm" ? "nav-link nav-link-active" : "nav-link"
          }
          onClick={() => {
            setSidebarMode("dm");
            handleSetLoadData();
          }}
        >
          <ChatBubbleOutlineIcon className="icon" />
        </button>

        <button
          className={
            sidebarMode === "channel" ? "nav-link nav-link-active" : "nav-link"
          }
          onClick={() => {
            setSidebarMode("channel");
            handleSetLoadData();
          }}
        >
          <PeopleOutlineIcon className="icon" />
        </button>

        <button
          className={
            sidebarMode === "search" ? "nav-link nav-link-active" : "nav-link"
          }
          onClick={() => {
            setSidebarMode("search");
            handleSetLoadData();
          }}
        >
          <SearchIcon className="icon" />
        </button>
      </div>

      <button
        className={
          sidebarMode === "user" ? "nav-link nav-link-active" : "nav-link"
        }
        onClick={() => setSidebarMode("user")}
      >
        <Photo id={currentUser.id} name={currentUser.email} isProfile="true" />
      </button>
    </nav>
  );
};

export default Navbar;
