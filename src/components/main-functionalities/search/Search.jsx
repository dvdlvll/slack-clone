// react libraries //
import React, { useContext, useState } from "react";
import { UserContext } from "../../../utils/context";
import { NavLink } from "react-router-dom";

// components //
import Photo from "../../Photo";

// component //
function Search() {
  // context //
  const { allUsers, handleSetLoadData } = useContext(UserContext);

  // search setstate //
  const [searchList, setSearchList] = useState([]);

  // handle search //
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
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search for a user..."
          onChange={handleSearchList}
        />
      </div>

      {searchList.length != 0 && (
        <div className="search-results">
          {searchList.slice(0, 15).map((user, index) => (
            <NavLink
              className="search-item"
              to={`user/${user.id}`}
              key={index}
              onClick={() => {
                handleSetLoadData();
              }}
            >
              <Photo id={user.id} name={user.email} isChannel={false} />
              <span> {user.email} </span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
