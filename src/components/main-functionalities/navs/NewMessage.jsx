// react libraries //
import React, { useContext, useState } from "react";
import { UserContext } from "../../../utils/context";

// components //
import Photo from "../../Photo";
import Input from "../message/Input";
import SearchMessage from "../search/SearchMessage";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";

function NewMessage() {
  // context, states //
  const { showMobile, setShowMobile } = useContext(UserContext);
  const [newMessageUser, setNewMessageUser] = useState(null);

  return (
    <div
      className={
        showMobile ? "main-content" : "main-content main-content-closed"
      }
    >
      <div className="new-messages-section">
        <div className="new-messages-header">
          <div className="chat-header">
            <button
              className={"back-button"}
              onClick={() => setShowMobile(false)}
            >
              <ArrowBackIosSharpIcon />
            </button>
            <h1 className="chat-name">New message</h1>
          </div>
          {!newMessageUser ? (
            <SearchMessage setNewMessageUser={setNewMessageUser} />
          ) : (
            <div className="newmsg-search-container">
              <span>To: </span>
              <div className="newmsg-user-container">
                <Photo id={newMessageUser.id} name={newMessageUser.email} />
                <span>{newMessageUser.email}</span>
                <div
                  className="delete-user-button"
                  onClick={() => setNewMessageUser()}
                >
                  ✕
                </div>
              </div>
            </div>
          )}
        </div>

        <Input
          type="User"
          id={newMessageUser ? newMessageUser.id : null}
          newMsg={true}
          setNewMessageUser={setNewMessageUser}
        />
      </div>
    </div>
  );
}

export default NewMessage;
