// react libraries //
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../../utils/context";

// components //
import Loading from "../../Loading";
import Bubble from "./Bubble";
import Header from "./Header";
import Input from "./Input";
import Scroll from "./Scroll";

// axios //
import { getCall } from "../../../utils/api-calls";
import { SEND_ENDPOINT } from "../../../utils/api-urls";

// component //
function Messages() {
  // context //
  const {
    currentHeaders,
    currentUser,
    channelList,
    allUsers,
    loadData,
    showMobile,
    messages,
    setMessages,
    setChatName,
  } = useContext(UserContext);

  const { type, id } = useParams();

  // set header and params //
  const getMessages = () => {
    let messageRequest = {
      "access-token": currentHeaders["access-token"],
      client: currentHeaders.client,
      expiry: currentHeaders.expiry,
      uid: currentHeaders.uid,
    };
    let messageParams = {
      user_id: parseInt(id),
      receiver_class: type.charAt(0).toUpperCase() + type.slice(1),
    };
    let emptyObj = {};

    // set success and error //
    let onSuccessMessage = (response) => {
      setMessages(response);
    };
    let onErrorMessage = (error) => {
      console.log(error);
    };

    // call //
    getCall(
      `${SEND_ENDPOINT}?receiver_id=${messageParams.user_id}&receiver_class=${messageParams.receiver_class}`,
      emptyObj,
      messageRequest,
      onSuccessMessage,
      onErrorMessage
    );
  };

  // get chat //
  const getChatName = () => {
    if (type === "channel") {
      channelList.data.data.map((channel) => {
        if (channel.id === parseInt(id)) {
          setChatName({
            id: channel.id,
            name: channel.name,
            isChannel: true,
            owner: channel.owner_id,
          });
        }
      });
    } else if (type === "user") {
      allUsers.data.data.map((user) => {
        if (user.id === parseInt(id)) {
          setChatName({
            id: user.id,
            name: user.email,
            isChannel: false,
          });
        }
      });
    }
  };

  useEffect(() => {
    getMessages();
    getChatName();
  }, [loadData]);

  if (!messages) {
    return <Loading />;
  } else {
    return (
      <div
        className={
          showMobile ? "main-content" : "main-content main-content-closed"
        }
      >
        <div className="messages-section">
          {messages ? (
            <>
              <Header type={type} id={id} messages={messages} />
              <div className="messages-content">
                {messages.data.data.length > 0 ? (
                  <div className="message-flex">
                    <div className="messages-container">
                      {messages.data.data.map((message, index) => {
                        return message.sender.id !== currentUser.id ? (
                          <Bubble
                            key={index}
                            keyNum={index}
                            id={message.sender.id}
                            name={message.sender.email}
                            message={message.body}
                            time={message.created_at}
                            className="incoming-messages"
                            type="sender"
                          />
                        ) : (
                          <Bubble
                            key={index}
                            keyNum={index}
                            id={message.sender.id}
                            name={message.sender.email}
                            message={message.body}
                            time={message.created_at}
                            className="outgoing-messages"
                            type="user"
                          />
                        );
                      })}
                      <Scroll />
                    </div>
                  </div>
                ) : (
                  <div className="message-container-empty">
                    <span className="empty-title">
                      No one's made a move yet.
                    </span>
                    <p>Why not be the first to say hi?</p>
                  </div>
                )}
              </div>
              <Input type={type} id={id} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default Messages;
