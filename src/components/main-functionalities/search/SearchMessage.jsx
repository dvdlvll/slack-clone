// react libraries //
import React, { useState, useContext } from "react";
import { UserContext } from "../../../utils/context";

// components //
import Photo from "../../Photo";

function SearchMessage({ setNewMessageUser }) {
  // context //
  const { allUsers, handleSetLoadData } = useContext(UserContext);
  const [searchList, setSearchList] = useState([]);

  // event handler //
  const handleSearchList = (e) => {
    const searchInput = e.target.value;

    const searchFilter = allUsers.data.data.filter((user) => {
      return user.email.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (searchInput === "") {
      setSearchList([]);
    } else {
      setSearchList(searchFilter);
    }
  };

  return (
    <>
      <div className="newmsg-search-container">
        <span>To: </span>
        <div className="newmsg-search-input-container">
          <input
            type="text"
            placeholder="someone@example.com"
            onChange={handleSearchList}
          />
        </div>
      </div>

      {searchList.length != 0 && (
        <div className="newmsg-search-results">
          {searchList.slice(0, 15).map((user, index) => (
            <div
              className="newmsg-search-item"
              key={index}
              onClick={() => {
                handleSetLoadData();
                setNewMessageUser(user);
              }}
            >
              <Photo id={user.id} name={user.email} isChannel={false} />
              <span>{user.email}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchMessage;
