// react libraries //
import React, { useContext } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// components //
import Photo from "../../Photo";

// component //
function ContactList() {
  const { allUsers, handleSetLoadData, setShowChatInfo } =
    useContext(UserContext);

  if (allUsers.data.data.length === 0) {
    return (
      <div className="users-container-empty">
        <span className="empty-title">How desolate.</span>
        <p>Why not start a new conversation?</p>
      </div>
    );
  } else {
    return (
      <div className="users-container">
        {allUsers.data.data.map((user, index) => (
          <NavLink
            to={`user/${user.id}`}
            className={(isActive) =>
              "user-item" + (!isActive ? " selected-message" : "")
            }
            key={index}
            onClick={() => {
              handleSetLoadData();
              setShowChatInfo(false);
            }}
          >
            <Photo id={user.id} name={user.email} />
            <span>{user.email}</span>
          </NavLink>
        ))}
      </div>
    );
  }
}

export default ContactList;
