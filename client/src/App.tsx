import React, { useState } from "react";
import { AUTH_TOKEN } from "./constants";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ResultsPageContainer } from "./pages/results-page/results-page-container";
import { QuestionsPageContainer } from "./pages/questions-page/questions-page-container";
import { LoginPageContainer } from "./pages/login-page/login-page-container";
// In production I would split this CSS file into individual
// components so that each component has it's style and logic
// context tied together.
import "./App.css";

function App() {
  const [authenticated, setAuthenticated] = useState<string | null>(
    localStorage.getItem(AUTH_TOKEN)
  );

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <QuestionsPageContainer setAuthenticated={setAuthenticated} />
            }
          />
          <Route
            path="/results"
            element={
              authenticated ? (
                <ResultsPageContainer />
              ) : (
                <LoginPageContainer setAuthenticated={setAuthenticated} />
              )
            }
          />
          <Route
            path="/login"
            element={<LoginPageContainer setAuthenticated={setAuthenticated} />}
          />
          {/* In production we'd ideally have a component to handle Not Found route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
