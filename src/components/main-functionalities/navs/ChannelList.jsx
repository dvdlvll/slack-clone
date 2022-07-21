// react libraries //
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// axios //
import { getMessageCall } from "../../../utils/api-calls";
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
    removeEmail,
    allChannelMessages,
    setAllChannelMessages,
    setShowMobile,
    setShowChatInfo,
  } = useContext(UserContext);

  const getRecentChannelMsgs = () => {
    if (channelList) {
      if (!channelList.data.errors) {
        // set params and headers //
        for (let i = 0; i < channelList.data?.data.length; i++) {
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
          getMessageCall(
            `${SEND_ENDPOINT}?receiver_id=${
              Object.values(recentChannelMsgsParams)[0]
            }&receiver_class=${Object.values(recentChannelMsgsParams)[1]}`,
            recentChannelMsgsParams,
            recentChannelMsgsRequest,
            onSuccessMessage,
            onError
          );
        }
      }
    }
  };

  const displayRecentChannelMsgs = (channel) => {
    for (let i = 0; i < allChannelMessages.length; i++) {
      if (channel.id === allChannelMessages[i].id) {
        return (
          <div className="recent-message-container">
            {allChannelMessages[i].sender ? (
              <span className="recent-message-sender">
                {removeEmail(allChannelMessages[i].sender.email)}:
              </span>
            ) : (
              ""
            )}
            <span className="recent-message">
              {allChannelMessages[i].message}
            </span>
          </div>
        );
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
            to={`/channel/${channel.id}`}
            className={(isActive) =>
              "channel-item" + (!isActive ? " selected-message" : "")
            }
            key={index}
            onClick={() => {
              handleSetLoadData();
              setShowMobile(true);
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
              {/* {displayRecentChannelMsgs(channel)} */}
            </div>
          </NavLink>
        ))}
      </div>
    );
  }
}

export default ChannelList;
