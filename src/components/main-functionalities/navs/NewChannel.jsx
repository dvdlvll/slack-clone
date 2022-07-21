// react libraries //
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../../utils/context";

// axios //
import { postCall } from "../../../utils/api-calls";
import { CHANNELS_ENDPOINT } from "../../../utils/api-urls";

// components //
import Button from "../../Button";
import Toast from "../../Toast";
import Photo from "../../Photo";
import SearchUser from "../search/SearchUser";

function NewChannel() {
  const {
    currentHeaders,
    setShowNewChannelModal,
    userIds,
    addUsers,
    setAddUsers,
    setUserIds,
    handleSetLoadData,
  } = useContext(UserContext);

  const channelNameRef = useRef();

  // toast //
  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // creating channel //
  const onCreateChannel = () => {
    // set data and header //
    const data = {
      name: channelNameRef.current.value,
      user_ids: userIds,
    };
    const headerObj = {
      "access-token": currentHeaders["access-token"],
      client: currentHeaders.client,
      expiry: currentHeaders.expiry,
      uid: currentHeaders.uid,
    };

    // set success and error //
    const onSuccessCreate = (response) => {
      if (response.data.errors) {
        setMessage(response.data.errors[0]);
        setIsSuccess(false);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        setMessage("Channel created!");
        setIsSuccess(true);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setShowNewChannelModal(false);
        }, 1500);
        userIds.splice(0, userIds.length);
        addUsers.splice(0, addUsers.length);
      }
    };

    const onErrorCreate = (error) => {
      console.log(error);
    };

    // call //
    postCall(
      CHANNELS_ENDPOINT,
      data,
      headerObj,
      onSuccessCreate,
      onErrorCreate
    );
  };

  // close modal //
  const closeFunction = () => {
    setAddUsers([]);
    setUserIds([]);
    setShowNewChannelModal(false);
  };

  //
  const updateIndex = (newList, newIdsList) => {
    setAddUsers(newList);
    setUserIds(newIdsList);
  };

  const deleteUser = (e) => {
    let tempArr1 = [...addUsers];
    tempArr1.splice(e.target.dataset.index, 1);

    let tempArr2 = [...userIds];
    tempArr2.splice(e.target.dataset.index, 1);
    updateIndex(tempArr1, tempArr2);
  };

  return (
    <div className="channel-modal-container">
      <form className="channel-modal">
        <div className="modal-upperhalf">
          <div className="modal-title">
            <span className="close-button" onClick={() => closeFunction()}>
              ✕
            </span>
            <h1 className="sidebar-title">Create a channel</h1>
          </div>

          <div className="newchannel-input-container">
            <label className="input-container">
              <span>Channel Name</span>
              <input type="text" min="3" max="15" ref={channelNameRef}></input>
            </label>

            {<SearchUser />}
          </div>
        </div>

        <span className="newchannel-users-container-label">
          Users to be added:
        </span>
        <div className="newchannel-users-container">
          {addUsers.map((value, index) => {
            return (
              <div className="select-users-container" key={index}>
                <Photo id={value.id} name={value.email} />
                <span>{value.email}</span>
                <div
                  className="delete-users-button"
                  data-index={index}
                  onClick={(e) => deleteUser(e)}
                >
                  ✕
                </div>
              </div>
            );
          })}
        </div>

        <Button
          className="button"
          type="submit"
          text="Create Channel"
          onClick={(e) => {
            e.preventDefault();
            handleSetLoadData();
            onCreateChannel();
          }}
        />
      </form>

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

export default NewChannel;
