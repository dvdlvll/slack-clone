// react libraries //
import React, { useEffect, useState, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import { postCall } from "../utils/api-calls";
import { LOGIN_ENDPOINT } from "../utils/api-urls";
import { UserContext } from "../utils/context";

// axios //

// parts //
import Button from "./Button";
import Toast from "./Toast";

// component //
function Login() {
  // context //
  const {
    setUser,
    setHeaders,
    setIsLoggedIn,
    loginMessage,
    localStorageLogin,
    setLoginMessage,
    tokenSessionStorage,
  } = useContext(UserContext);

  // inputs //
  let loginEmailRef = useRef(null);
  let loginPasswordRef = useRef(null);

  // toast //
  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // toggle option to local storage //
  const [rememberUser, setRememberUser] = useState(null);

  const isRememberUser = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setRememberUser(true);
    } else {
      setRememberUser(false);
    }
  };

  const onLogin = () => {
    if (
      loginEmailRef.current.value !== "" &&
      loginPasswordRef.current.value !== ""
    ) {
      // toast message while waiting for API response //
      setMessage("Logging in...");
      setIsSuccess(true);

      const data = {
        email: loginEmailRef.current.value,
        password: loginPasswordRef.current.value,
      };

      const emptyObj = {};

      const onSuccess = (response) => {
        setHeaders(response.headers);
        setUser(response.data.data);
        setMessage("Logged in!");
        setIsLoggedIn(true);
        console.log(response);

        // store to local storage //
        if (rememberUser) {
          localStorageLogin(data);
          tokenSessionStorage(response.data.data, response.headers);
        }
      };

      const onError = (error) => {
        if (error.response) {
          // request made and server responded //
          setHeaders("");
          setUser("");
          setMessage(error.response.data.errors[0]);
          setTimeout(() => {
            setMessage(false);
          }, 3000);
        } else if (error.request) {
          // request made and server did not respond //
          setMessage("Server error, please try again.");
          setTimeout(() => {
            setMessage(false);
          }, 3000);
        } else {
          // Something happened in setting up the request that triggered an Error
          setMessage("Something went wrong, please try again.");
          setTimeout(() => {
            setMessage(false);
          }, 3000);
        }
      };

      postCall(LOGIN_ENDPOINT, data, emptyObj, onSuccess, onError);

      // error handling for no input //
    } else {
      setMessage("Please fill out the required fields");
      setTimeout(() => {
        setMessage("");
      }, 3000);
      setIsSuccess(false);
    }
  };

  // logged in //
  useEffect(() => {
    const localStorageLoginUser = JSON.parse(localStorage.getItem("User"));
    const sessionStorageUser = JSON.parse(sessionStorage.getItem("User"));
    const sessionStorageHeaders = JSON.parse(sessionStorage.getItem("Headers"));

    if (sessionStorageUser) {
      setIsLoggedIn(true);
      setHeaders(sessionStorageHeaders);
      setUser(sessionStorageUser);
    } else if (localStorageLoginUser) {
      setLoginMessage("Logging you in...");
      setIsSuccess(true);

      userSessionAPI(localStorageLoginUser)
        .then((res) => {
          setHeaders(res.headers);
          setUser(res.data.data);
          setLoginMessage("Logged in!");
          setIsSuccess(true);
          setIsLoggedIn(true);
          tokenSessionStorage(res.data.data, res.headers);
        })
        .catch((err) => {
          if (err.response) {
            // Request made and server responded
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            setHeaders("");
            setUser("");
            setLoginMessage(err.response.data.errors[0]);
            setTimeout(() => {
              setLoginMessage("");
              setIsSuccess(false);
            }, 3000);
            setTimeout(() => {
              setLoginMessage("");
              setIsSuccess(false);
            }, 3000);
          } else if (err.request) {
            // The request was made but no response was received
            console.log(err.request);
            setLoginMessage("Server error, please try again.");
            setIsSuccess(false);
            setTimeout(() => {
              setLoginMessage("");
            }, 3000);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", err.message);
          }
        });
    }
  }, []);

  return (
    <div className="landing-main">
      <h2 className="landing-title">Hey there!</h2>
      <p className="landing-subtitle">
        The very cool, totally original messaging app, for the real ones.
      </p>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          onLogin({});
        }}
      >
        <label className="input-container">
          <span>Email</span>
          <input
            type="email"
            name="login-email"
            id="login-email"
            ref={loginEmailRef}
            autoComplete="off"
          />
        </label>

        <label className="input-container">
          <span>Password</span>
          <input
            type="password"
            name="login-password"
            id="login-password"
            ref={loginPasswordRef}
          />
        </label>

        <label className="checkbox-container">
          <input
            type="checkbox"
            name="remember-user"
            id="remember-user"
            onClick={(e) => {
              isRememberUser(e);
            }}
          />
          <span>Keep me logged in</span>
        </label>

        <Button type="submit" text="Login" className="button" />
      </form>

      <div className="landing-switch">
        Don't have an account yet?{" "}
        <NavLink className="hyperlink" to="/register">
          Sign up here.
        </NavLink>
      </div>

      {message || loginMessage ? (
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
    </div>
  );
}

export default Login;
