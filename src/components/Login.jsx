// react libraries //
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

// axios //

// parts //
import Button from "./Button";
import Toast from "./Toast";

// component //
function Login() {
  let loginEmailRef = useRef(null);
  let loginPasswordRef = useRef(null);

  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    }
  };

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
            autocomplete="off"
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

      {showToast || message ? (
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
