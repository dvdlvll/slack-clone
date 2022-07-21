// react libraries //
import React, { useState } from "react";

// components //
import Photo from "../../Photo";

// component //
function Bubble({ keyNum, className, id, name, message, time, type }) {
  // time functionalities //
  const date = new Date(time);

  const formattedTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = date.toLocaleDateString("en-US");

  const [showTime, setShowTime] = useState(false);
  const handleSetShowTime = () => [setShowTime(!showTime)];

  return (
    <div className={className} key={keyNum} onClick={handleSetShowTime}>
      <div className="photo-message-container">
        <Photo id={id} name={name} />
        <span className={`message-bubble-${type}`}>{message}</span>
      </div>

      <span className={`message-${type}-name`}>{name}</span>

      {showTime ? (
        <span className={`message-time-${type}`}>
          {formattedDate} {formattedTime}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export default Bubble;
