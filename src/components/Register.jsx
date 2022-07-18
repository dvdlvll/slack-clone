// react libraries //
import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";

// axios //
import { postCall } from "../data/api-calls";
import { REGISTER_ENDPOINT } from "../data/api-urls";

// parts //
import Button from "./Button";
import Toast from "./Toast";

// component //
function Register() {
  const registerEmailRef = useRef(null);
  const registerPasswordRef = useRef(null);
  const registerConfirmPasswordRef = useRef(null);

  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);
  const [showRegError, setShowRegError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onRegister = () => {
    // error handling for password mismatch //
    if (
      registerPasswordRef.current.value !==
      registerConfirmPasswordRef.current.value
    ) {
      setMessage("Password did not match");
      setShowRegError(true);
      registerPasswordRef.current.focus();
      setTimeout(() => {
        setShowRegError(false);
      }, 3000);
      // error handling for password length //
    } else if (registerPasswordRef.current.value.length < 6) {
      setMessage("Password is too short");
      setShowRegError(true);
      setTimeout(() => {
        setShowRegError(false);
      }, 3000);
      // error handling for email validity //
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        registerEmailRef.current.value
      )
    ) {
      setMessage("Please enter a valid email");
      setShowRegError(true);
      registerEmailRef.current.focus();
      setTimeout(() => {
        setShowRegError(false);
      }, 3000);
      // success //
    } else {
      const data = {
        email: registerEmailRef.current.value,
        password: registerPasswordRef.current.value,
        password_confirmation: registerConfirmPasswordRef.current.value,
      };

      const emptyObj = {};

      const onSuccess = () => {
        setMessage("Registration Success!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setIsSuccess(true);
        console.log("success", onSuccess);
      };

      const onError = () => {
        setMessage("Something went wrong, please try again");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setIsSuccess(false);
        console.log("err", onError);
      };

      postCall(REGISTER_ENDPOINT, data, emptyObj, onSuccess, onError);
    }
  };

  return (
    <div className="landing-main">
      <h2 className="landing-title">Let's begin!</h2>
      <p className="landing-subtitle">
        Create an account to connect with people
      </p>
      <form
        className="form-container"
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
      >
        <br />

        <label className="input-container">
          <span>Email</span>
          <input
            type="email"
            name="register-email"
            id="register-email"
            ref={registerEmailRef}
            autocomplete="off"
          />
        </label>

        <label className="input-container">
          <span>Password</span>
          <input
            type="password"
            name="register-name"
            min="6"
            id="register-password"
            ref={registerPasswordRef}
          />
        </label>

        <label className="input-container">
          <span>Confirm Password</span>
          <input
            type="password"
            name="register-name"
            min="6"
            id="register-passconfirm"
            ref={registerConfirmPasswordRef}
          />
        </label>

        <Button text="Register" type="submit" className="button" />
      </form>

      <div className="landing-switch">
        Already have an account?{" "}
        <NavLink className="hyperlink" to="/login">
          Log in.
        </NavLink>
      </div>

      {showToast || showRegError ? (
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

export default Register;
