// react libraries //
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// components //
import Photo from "../../Photo";
import NoContacts from "../../../assets/images/undraw_following_re_d5aa.svg";

function ChannelList() {
  // context //
  const { channelList, handleSetLoadData, setShowChatInfo } =
    useContext(UserContext);

  if (channelList.data.errors) {
    return (
      <div className="channel-container-empty">
        <img src={NoContacts} alt="No contacts" />
        <span className="empty-title">Hmm... this is empty.</span>
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
