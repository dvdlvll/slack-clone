// react libraries //
import React, { useContext, useState } from "react";
import { UserContext } from "../../../utils/context";

// components //
import Photo from "../../Photo";
import Toast from "../../Toast";

// component //
function SearchUser({ placeholder }) {
  // context //
  const { allUsers, addUsers, setAddUsers, userIds, setUserIds } =
    useContext(UserContext);

  // search //
  const [searchList, setSearchList] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // toast //
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // handle search list //
  const handleSearchList = (e) => {
    const searchInput = e.target.value;
    setSearchValue(searchInput);
    const searchFilter = allUsers.data.data.filter((user) => {
      return user.email.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (searchInput === "") {
      setSearchList([]);
    } else {
      setSearchList(searchFilter);
    }
  };

  // add user //
  const addUser = (user) => {
    if (addUsers.includes(user)) {
      setIsSuccess(false);
      setShowToast(true);
      setMessage("User already added.");
      setTimeout(() => {
        setShowToast(false);
      }, 1000);
    } else {
      setAddUsers([...addUsers, user]);
      setUserIds([...userIds, user.id]);
    }
  };

  // clear search input //
  const clearSearchField = () => {
    setSearchList([]);
    setSearchValue("");
  };

  return (
    <>
      {showToast ? (
        <Toast
          className={
            isSuccess
              ? "toast-message toast-message-success"
              : "toast-message toast-message-error"
          }
          text={message}
        />
      ) : (
        <></>
      )}

      <div className="input-container">
        <span>Add users</span>
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleSearchList}
          value={searchValue}
        />
      </div>

      {searchList.length !== 0 && (
        <div className="newchannel-search-results">
          {searchList.slice(0, 5).map((user, index) => (
            <div
              className="newmsg-search-item"
              key={index}
              onClick={() => {
                addUser(user, index);
                clearSearchField();
              }}
            >
              <Photo id={user.id} name={user.email} />
              <span>{user.uid}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default SearchUser;
