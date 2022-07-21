// react libraries //
import React, { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../utils/context";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

// axios //
import { getMessageCall } from "../../../utils/api-calls";
import { SEND_ENDPOINT } from "../../../utils/api-urls";

// component //
function Input() {
  const { currentHeaders, handleSetLoadData } = useContext(UserContext);

  let messageInputRef = useRef(null);
  let navigate = useNavigate();

  const sendMessage = ({ type, id, newMsg, setNewMessageUser }) => {
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
        message: messageInputRef.current.value,
      };

      // set success and error //
      let onSuccessMessage = () => {
        handleSetLoadData();
        messageInputRef.current.value = "";
      };
      let onSuccessError = (error) => {
        console.log(error);
      };

      // call //
      getMessageCall(
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
        navigate(`user/${id}`);
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
