// react libraries //
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// axios //
import { getCall } from "../../../utils/api-calls";
import { SEND_ENDPOINT } from "../../../utils/api-urls";

// components //
import Photo from "../../Photo";

function ChannelList() {
  // context //
  const {
    channelList,
    handleSetLoadData,
    currentHeaders,
    loadData,
    setAllChannelMessages,
    setShowChatInfo,
  } = useContext(UserContext);

  const getRecentChannelMsgs = () => {
    if (channelList) {
      if (!channelList.data.errors) {
        // set params and headers //
        for (let i = 0; i < channelList.data.data.length; i++) {
          let recentChannelMsgsRequest = {
            "access-token": currentHeaders["access-token"],
            client: currentHeaders.client,
            expiry: currentHeaders.expiry,
            uid: currentHeaders.uid,
          };
          let recentChannelMsgsParams = {
            receiver_id: parseInt(channelList.data.data[i].id),
            receiver_class: "Channel",
          };
          let emptyObj = {};

          // set success and error //
          let onSuccessMessage = (response) => {
            if (response.data.data.length > 0) {
              setAllChannelMessages((allChannelMessages) => [
                ...allChannelMessages,
                {
                  id: parseInt(channelList.data.data[i].id),
                  message: response.data.data.at(-1).body,
                  sender: response.data.data.at(-1).sender.email,
                },
              ]);
            } else {
              setAllChannelMessages((allChannelMessages) => [
                ...allChannelMessages,
                {
                  id: parseInt(channelList.data.data[i].id),
                  message: "No messages",
                  sender: null,
                },
              ]);
            }
          };

          let onError = (error) => {
            console.log(error);
          };

          // axios call //
          getCall(
            `${SEND_ENDPOINT}?receiver_id=${recentChannelMsgsParams.receiver_id}&receiver_class=${recentChannelMsgsParams.receiver_class}`,
            emptyObj,
            recentChannelMsgsRequest,
            onSuccessMessage,
            onError
          );
        }
      }
    }
  };

  useEffect(() => {
    getRecentChannelMsgs();
  }, [loadData, currentHeaders]);

  if (channelList.data.errors) {
    return (
      <div className="contact-container-empty">
        <span className="empty-title">How desolate.</span>
        <p>Create a new channel and hang out with your friends!</p>
      </div>
    );
  } else {
    return (
      <div className="channel-container">
        {channelList.data.data.map((channel, index) => (
          <NavLink
            to={`channel/${channel.id}`}
            className={(isActive) =>
              "channel-item" + (!isActive ? " selected-message" : "")
            }
            key={index}
            onClick={() => {
              handleSetLoadData();
              setShowChatInfo(false);
            }}
          >
            <Photo
              id={channel.id}
              name={channel.name}
              isChannel={true}
              isProfile={true}
            />
            <div className="inbox-info">
              <span className="inbox-name">{channel.name}</span>
            </div>
          </NavLink>
        ))}
      </div>
    );
  }
}

export default ChannelList;
