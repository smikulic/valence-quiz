import React, { useEffect, useState } from "react";
import { ResultsPage } from "../../components/results-page/results-page";
import { AUTH_TOKEN_USER } from "../../constants";

export const ResultsPageContainer = () => {
  const [perspectiveType, setPerspectiveType] = useState("");

  const getResult = async () => {
    const email = localStorage.getItem(AUTH_TOKEN_USER);
    fetch(`http://localhost:8000/api/user?email=${email}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => setPerspectiveType(response?.data?.perspectiveType));
  };

  useEffect(() => {
    getResult();
  }, []);

  console.log({ perspectiveType });
  return <ResultsPage perspectiveType={perspectiveType} />;
};
