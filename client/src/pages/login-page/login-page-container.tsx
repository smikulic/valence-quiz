import React, { Dispatch, SetStateAction, useState } from "react";
import { AUTH_TOKEN, AUTH_TOKEN_USER } from "../../constants";
import "./login-page-container.css";

export const LoginPageContainer = ({
  setAuthenticated,
}: {
  setAuthenticated: Dispatch<SetStateAction<string | null>>;
}) => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    login: true,
    email: "",
  });

  const loginAction = () => {
    // This should be fetched over network
    const loginToken = "loginToken";
    localStorage.setItem(AUTH_TOKEN, loginToken);
    localStorage.setItem(AUTH_TOKEN_USER, formState.email);
    setAuthenticated(loginToken);
    setLoginLoading(false);
    window.location.replace("/results");
  };

  return (
    <div className="loginPage">
      <h1 className="title">Login to see your Quiz results</h1>
      <div className="form">
        <div className="formField">
          <label>Email address</label>
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Enter your email"
          />
        </div>
        <div className="actions">
          <button
            onClick={() => {
              setLoginLoading(true);
              loginAction();
            }}
          >
            {loginLoading && <>...</>}
            {!loginLoading && <>Login</>}
          </button>
          <p
            onClick={(e) =>
              setFormState({
                ...formState,
                login: !formState.login,
              })
            }
          >
            need to fill out the Quiz?{" "}
            <span
              className="redirectToQuiz"
              onClick={() => window.location.replace("/")}
            >
              click here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
