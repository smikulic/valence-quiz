import React, { Dispatch, SetStateAction } from "react";
import { QuestionsPage } from "../../components/questions-page/questions-page";
import { AUTH_TOKEN, AUTH_TOKEN_USER } from "../../constants";

export type CreateUserT = {
  email: String;
  answers: {};
};

export const QuestionsPageContainer = ({
  setAuthenticated,
}: {
  setAuthenticated: Dispatch<SetStateAction<string | null>>;
}) => {
  const createUser = async ({ email, answers }: CreateUserT) => {
    fetch("http://localhost:8000/api/users", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({ email, answers }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response.data);
        const loginToken = "loginToken";
        localStorage.setItem(AUTH_TOKEN, loginToken);
        localStorage.setItem(AUTH_TOKEN_USER, response.data.email);
        setAuthenticated(loginToken);
        window.location.replace("/results");
      });
  };
  return <QuestionsPage createUser={createUser} />;
};
