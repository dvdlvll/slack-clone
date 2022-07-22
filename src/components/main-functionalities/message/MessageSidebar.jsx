// react libraries //
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// axios //
import { postCall, getCall } from "../../../utils/api-calls";
import {
  ADD_MEMBER_ENDPOINT,
  CHANNELS_ENDPOINT,
} from "../../../utils/api-urls";

// components //
import Photo from "../../Photo";
import Toast from "../../Toast";
import Button from "../../Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

function MessageSidebar() {
  // context //
  const {
    allUsers,
    currentHeaders,
    handleSetShowChatInfo,
    showChatInfo,
    loadData,
    chatName,
    addUsers,
    getUserName,
    handleSetLoadData,
    setShowMobile,
    setShowChatInfo,
  } = useContext(UserContext);

  // states //
  const [searchList, setSearchList] = useState([]);

  const [channelMembers, setChannelMembers] = useState();

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [addNewUser, setAddNewUser] = useState();
  const [showInvite, setShowInvite] = useState(false);

  // set headers and data //
  const onAddUser = () => {
    let addUserRequest = {
      "access-token": currentHeaders["access-token"],
      client: currentHeaders.client,
      expiry: currentHeaders.expiry,
      uid: currentHeaders.uid,
    };

    let addUserData = {
      id: chatName.id,
      member_id: addNewUser,
    };

    // set success and error //
    const onSuccessAddUser = (response) => {
      if (response.data.errors) {
        setIsSuccess(false);
        setShowToast(true);
        setMessage(response.data.errors[0]);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setShowInvite(false);
        setIsSuccess(true);
        setShowToast(true);
        setMessage("User added");
        setTimeout(() => {
          setShowToast(false);
        }, 1500);
      }
      console.log(response);
    };

    const onErrorAddUser = (error) => {
      console.log(error);
    };

    // call //
    postCall(
      ADD_MEMBER_ENDPOINT,
      addUserData,
      addUserRequest,
      onSuccessAddUser,
      onErrorAddUser
    );
  };

  // reset input //
  const clearSearchField = () => {
    setSearchList([]);
  };

  // add user //
  const addUser = (user) => {
    if (addUsers.includes(user)) {
      setIsSuccess(false);
      setShowToast(true);
      setMessage("User already added.");
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } else {
      setAddNewUser(user.id);
    }
  };

  useEffect(() => {
    if (chatName && chatName.isChannel) {
      // set header and data //
      let emptyObj = {};

      let channelInfoRequest = {
        "access-token": currentHeaders["access-token"],
        client: currentHeaders.client,
        expiry: currentHeaders.expiry,
        uid: currentHeaders.uid,
      };

      // set success and error //
      const onSuccessChannelInfo = (response) => {
        setChannelMembers(response.data.data.channel_members);
      };

      const onErrorChannelInfo = (error) => {
        console.log(error);
      };

      getCall(
        `${CHANNELS_ENDPOINT}/${chatName.id}`,
        emptyObj,
        channelInfoRequest,
        onSuccessChannelInfo,
        onErrorChannelInfo
      );
    }
  }, [loadData, chatName, showChatInfo]);

  const handleSearchList = (e) => {
    const searchInput = e.target.value;
    const searchFilter = allUsers.data?.data.filter((user) => {
      return user.email.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (searchInput === "") {
      setSearchList([]);
    } else {
      setSearchList(searchFilter);
    }
  };

  return (
    <div
      className={
        showChatInfo
          ? "message-sidebar"
          : "message-sidebar message-sidebar-closed"
      }
    >
      <div className="modal-title">
        <span
          className="close-button-sidebar"
          onClick={() => {
            handleSetShowChatInfo();
            setShowInvite(false);
          }}
        >
          ✕
        </span>
      </div>

      {chatName && (
        <div className="message-sidebar-title">
          <Photo
            id={chatName.id}
            name={chatName?.name}
            isChannel={chatName.isChannel}
            isProfile={true}
          />
          <h1 className="sidebar-title">{chatName.name}</h1>
        </div>
      )}

      {chatName && chatName.isChannel ? (
        <>
          {!showInvite ? (
            <div
              className="invite-user-toggle"
              onClick={() => {
                setShowInvite(true);
              }}
            >
              <PersonAddIcon />
              <span>Invite user to group</span>
            </div>
          ) : (
            <div className="invite-user-container">
              {!addNewUser ? (
                <>
                  <input
                    className="invite-user-input"
                    type="text"
                    placeholder={"Invite a user..."}
                    onChange={handleSearchList}
                  />
                  {searchList.length !== 0 && (
                    <div className="invite-user-search-results">
                      {searchList.slice(0, 5).map((user, index) => (
                        <div
                          className="newmsg-search-item"
                          key={index}
                          onClick={() => {
                            addUser(user, index);
                            clearSearchField();
                          }}
                        >
                          <Photo id={user.id} name={user.email} />
                          <span>{user.uid}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="invite-users-container">
                    <div>
                      <Photo id={addNewUser} name={getUserName(addNewUser)} />
                      <span>{getUserName(addNewUser)}</span>
                    </div>
                    <div
                      className="delete-user-button"
                      onClick={() => setAddNewUser()}
                    >
                      ✕
                    </div>
                  </div>
                  <Button
                    text={"+ Invite user"}
                    className="button"
                    onClick={() => {
                      onAddUser();
                      handleSetLoadData();
                    }}
                  />
                </>
              )}
            </div>
          )}{" "}
        </>
      ) : (
        <div
          className="invite-user-toggle"
          onClick={() => {
            setShowInvite(true);
          }}
        >
          <FavoriteBorderIcon />
          <span>Add to favorites</span>
        </div>
      )}

      {chatName && channelMembers && chatName.isChannel ? (
        <>
          <span className="member-list-label">Group members</span>
          <div className="member-list">
            {channelMembers.map((member, index) => (
              <NavLink
                to={`user/${member.user_id}`}
                className="newmsg-search-item"
                key={index}
                onClick={() => {
                  handleSetLoadData();
                  setShowMobile(true);
                  setShowChatInfo(false);
                }}
              >
                <Photo id={member.user_id} name={getUserName(member.user_id)} />
                <span>{getUserName(member.user_id)}</span>
              </NavLink>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
      {showToast ? (
        <Toast
          className={
            isSuccess
              ? "toast-message toast-message-success"
              : "toast-message toast-message-error"
          }
          text={message}
        />
      ) : (
        <></>
      )}
    </div>
  );
}

export default MessageSidebar;
