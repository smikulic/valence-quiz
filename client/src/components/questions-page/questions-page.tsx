import React, { useState } from "react";
import { questionSet } from "../../constants";
import { CreateUserT } from "../../pages/questions-page/questions-page-container";

export const QuestionsPage = ({
  createUser,
}: {
  createUser: (submitData: CreateUserT) => void;
}) => {
  const [errorEmail, setErrorEmail] = useState("");
  const [email, setEmail] = useState("");
  const [questions, setQuestions] = useState({
    question1: 0,
    question2: 0,
    question3: 0,
    question4: 0,
    question5: 0,
    question6: 0,
    question7: 0,
    question8: 0,
    question9: 0,
    question10: 0,
  });

  const optionsArray = [...Array(7)];

  const submitQuiz = () => {
    console.log("submitQuiz");
    const submitData: CreateUserT = {
      email,
      answers: questions,
    };
    console.log({ submitData });

    // In production I would also check whether all of the questions
    // have been answered.
    if (!email) {
      setErrorEmail("Please enter your email to submit your Quiz.");
    } else {
      createUser(submitData);
    }
  };

  return (
    <div className="container">
      <h2 className="blue">Discover Your Perspective</h2>
      <p>
        Complete the 7 min test and get a detailed report of your lenses on the
        world.
      </p>
      <form className="questions">
        {/* In production I would load this data set from API and implement a
            spinner/loader while I wait the data to be loaded.
            I would also save any answered questions to the localStorage so that the user can continue
            where they left off. */}
        {questionSet &&
          questionSet.map((question, key) => {
            const questionKey = `question${key + 1}`;

            {
              /* In production this should be split into <Question /> component */
            }
            return (
              <div key={key} className="question">
                <h3 className="questionTitle">{question.title}</h3>
                <div className="answerSection">
                  <div className="red">Disagree</div>
                  <div className="answerOptions">
                    {optionsArray.map((_, key) => {
                      const questionValue = key + 1;

                      {
                        /* In production I would add a a nicer third party component
                          or simply style this radio better  */
                      }
                      return (
                        <input
                          key={key}
                          type="radio"
                          name={questionKey}
                          onChange={() => {
                            setQuestions({
                              ...questions,
                              [questionKey]: questionValue,
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="green">Agree</div>
                </div>
              </div>
            );
          })}

        <div className="emailSection">
          <h3 className="blue">Your Email</h3>
          <input
            type="text"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && <span className="red">{errorEmail}</span>}
        </div>

        <div className="submitSection">
          {/* In production this button would also have a loading state when submitting.
              I would also add a 'disabled' state to communicate to user that 
              they are missing some fields. */}
          <div className="action prominent" onClick={submitQuiz}>
            Save & Continue
          </div>
        </div>
      </form>
    </div>
  );
};
