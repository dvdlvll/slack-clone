import { useState, createContext } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  /*===========================================================
  ====================login functionalities====================
  ===========================================================*/
  // current user information //
  const [currentUser, setUser] = useState(null);

  // access tokens //
  const [currentHeaders, setHeaders] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  // save user to local storage //
  const localStorageLogin = (data) => {
    localStorage.setItem("User", JSON.stringify(data));
  };

  const tokenSessionStorage = (data, headers) => {
    sessionStorage.setItem("User", JSON.stringify(data));
    sessionStorage.setItem("Headers", JSON.stringify(headers));
  };

  /*==========================================================
  ====================main functionalities====================
  ==========================================================*/

  // show new channel modal //
  const [showNewChannelModal, setShowNewChannelModal] = useState(false);

  // show content for mobile //
  const [showMobile, setShowMobile] = useState(false);

  // sidebar status //
  const [sidebarMode, setSidebarMode] = useState("dm");

  // show chat info //
  const [showChatInfo, setShowChatInfo] = useState(false);
  const handleSetShowChatInfo = () => {
    setShowChatInfo((showChatInfo) => !showChatInfo);
  };
  const [chatInfo, setChatInfo] = useState({});
  const [chatName, setChatName] = useState();

  // list of data //
  const [channelList, setChannelList] = useState("");
  const [allUsers, setAllUsers] = useState("");
  const [contactList, setContactList] = useState("");
  const [addUsers, setAddUsers] = useState([]);
  const [userIds, setUserIds] = useState([]);

  // refreshing / reloading data
  const [loadData, setLoadData] = useState(false);

  // toggle data refresh / reload
  const handleSetLoadData = () => {
    setLoadData(!loadData);
  };

  // messages //
  const [messages, setMessages] = useState();

  // channels //
  const [allChannelMessages, setAllChannelMessages] = useState([]);

  // logout function //
  const logoutFunction = () => {
    localStorage.setItem("User", null);
    sessionStorage.setItem("User", null);
    sessionStorage.setItem("Headers", null);
    setUser(null);
    setHeaders(null);
    setIsLoggedIn(false);
    setLoginMessage("");
    setSidebarMode("dm");
    setShowMobile(false);
    setAllChannelMessages();
    setMessages();
    setContactList("");
    setChannelList("");
    return <Navigate to="/login" />;
  };

  // remove @___.___ from email
  const removeEmail = (email) => {
    return email.split("@")[0];
  };

  /*==========================================================
  ==========================provider==========================
  ==========================================================*/
  return (
    <UserContext.Provider
      value={{
        currentUser,
        setUser,
        currentHeaders,
        setHeaders,
        isLoggedIn,
        setIsLoggedIn,
        loginMessage,
        setLoginMessage,

        localStorageLogin,
        tokenSessionStorage,

        loadData,
        setLoadData,
        handleSetLoadData,

        showNewChannelModal,
        setShowNewChannelModal,

        showMobile,
        setShowMobile,

        sidebarMode,
        setSidebarMode,

        showChatInfo,
        setShowChatInfo,
        handleSetShowChatInfo,
        chatInfo,
        setChatInfo,
        chatName,
        setChatName,

        channelList,
        setChannelList,
        allUsers,
        setAllUsers,
        contactList,
        setContactList,
        addUsers,
        setAddUsers,
        userIds,
        setUserIds,

        messages,
        setMessages,
        allChannelMessages,
        setAllChannelMessages,

        logoutFunction,
        removeEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
