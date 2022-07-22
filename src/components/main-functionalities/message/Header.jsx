// react libraries //
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../utils/context";

// components //
import Photo from "../../Photo";
import Toggle from "./Toggle";
import ArrowBackIosSharpIcon from "@mui/icons-material/ArrowBackIosSharp";

// component //
function Header({ type, id, messages, channelMembers }) {
  const { channelList, allUsers, loadData, chatInfo, setChatInfo } =
    useContext(UserContext);

  useEffect(() => {
    if (type === "channel") {
      channelList.data.data.map((channel) => {
        if (channel.id === parseInt(id)) {
          setChatInfo({
            id: channel.id,
            name: channel.name,
            isChannel: true,
          });
        }
      });
    } else if (type === "user") {
      allUsers.data.data.map((user) => {
        if (user.id === parseInt(id)) {
          setChatInfo({
            id: user.id,
            name: user.email,
            isChannel: false,
          });
        }
      });
    }
  }, [loadData]);

  return (
    <>
      {chatInfo ? (
        <div className="chat-header">
          <button className={"back-button"}>
            <ArrowBackIosSharpIcon />
          </button>

          <div className="header-name">
            {!chatInfo.isChannel ? (
              <Photo
                id={chatInfo.id}
                name={chatInfo.name}
                isChannel={chatInfo.isChannel}
              />
            ) : (
              ""
            )}

            <h1
              className={
                !chatInfo.isChannel ? "chat-name chat-name-user" : "chat-name "
              }
            >
              {chatInfo.name}
            </h1>
          </div>

          <Toggle id={chatInfo.id} channelMembers={channelMembers} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Header;
