// react libraries //
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../utils/context";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

// axios //
import { postCall } from "../../../utils/api-calls";
import { SEND_ENDPOINT } from "../../../utils/api-urls";

// component //
function Input({ type, id, newMsg, setNewMessageUser }) {
  const { currentHeaders, handleSetLoadData } = useContext(UserContext);

  let messageInputRef = useRef(null);
  let navigate = useNavigate();

  const sendMessage = () => {
    if (
      (messageInputRef.current.value !== null ||
        messageInputRef.current.value !== "") &&
      id !== null
    ) {
      // set params and headers //
      let sendMessageRequest = {
        "access-token": currentHeaders["access-token"],
        client: currentHeaders.client,
        expiry: currentHeaders.expiry,
        uid: currentHeaders.uid,
      };
      let sendMessageParams = {
        receiver_id: parseInt(id),
        receiver_class: type.charAt(0).toUpperCase() + type.slice(1),
        body: messageInputRef.current.value,
      };

      // set success and error //
      let onSuccessMessage = (response) => {
        handleSetLoadData();
        messageInputRef.current.value = "";
        console.log(response);
      };
      let onSuccessError = (error) => {
        console.log(error);
      };

      // call //
      postCall(
        SEND_ENDPOINT,
        sendMessageParams,
        sendMessageRequest,
        onSuccessMessage,
        onSuccessError
      );

      if (
        (messageInputRef.current.value !== null ||
          messageInputRef.current.value !== "") &&
        newMsg &&
        id !== null
      ) {
        navigate(`/main/user/${id}`);
        setNewMessageUser();
      }
    }
  };

  return (
    <form
      className="message-input-container"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <label className="message-input">
        <input
          type="text"
          name="message-input"
          id="message-input"
          autoComplete="off"
          placeholder="Type your message here..."
          max="255"
          ref={messageInputRef}
        />
      </label>

      <button type="submit" className="send-button">
        <SendRoundedIcon />
      </button>
    </form>
  );
}

export default Input;
