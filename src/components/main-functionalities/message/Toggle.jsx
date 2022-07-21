// react libraries //
import React, { useContext } from "react";
import { UserContext } from "../../../utils/context";

// components //
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function Toggle({ id, channelMembers }) {
  const { handleSetShowChatInfo } = useContext(UserContext);

  return (
    <div
      className="message-sidebar-toggle"
      onClick={() => {
        handleSetShowChatInfo();
      }}
    >
      <MenuRoundedIcon />
    </div>
  );
}

export default Toggle;
