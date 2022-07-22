import React from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";

function Photo({ id, name, isChannel, isProfile }) {
  const getFirstLetter = () => {
    let firstLetter = name.charAt(0);
    return firstLetter.toUpperCase();
  };

  let colors = [
    "#d5a6bd", // pink
    "#ef7c8e", // red
    "#f0ce7c", // orange
    "#68c8f8", // blue
    "#ffdc17", // yellow
    "#a2f09e", // green
  ];

  let colorNumber;

  const getColor = () => {
    if (id === 0) {
      return (colorNumber = 0);
    } else if (id >= colors.length) {
      return (colorNumber = Math.floor(id % colors.length));
    } else if (id < colors.length) {
      return (colorNumber = Math.floor(colors.length % id));
    }
  };

  getColor();

  return (
    <div className="photo-container">
      <div
        className={isProfile ? "dp" : "not-dp"}
        style={{
          backgroundColor: colors[colorNumber],
        }}
      >
        {getFirstLetter()}
      </div>

      {isChannel ? (
        <div className="cp-container">
          <PeopleOutlineIcon className="cp-icon" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Photo;
