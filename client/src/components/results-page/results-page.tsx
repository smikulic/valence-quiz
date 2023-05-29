import React from "react";
import { ProgressBar } from "../progress-bar/progress-bar";

export const ResultsPage = ({
  perspectiveType,
}: {
  perspectiveType: string;
}) => {
  let perspectiveMap = Array.from(perspectiveType);
  return (
    <div className="container twoColumn">
      <div className="leftColumn">
        <h2 className="blue">Your Perspective</h2>
        <p>Your Perspective Type is {perspectiveType}</p>
      </div>
      <div className="rightColumn">
        <div className="item">
          <div>Introversion (I)</div>
          <div>
            <ProgressBar leftActive={perspectiveMap[0] === "I"} />
          </div>
          <div>Extraversion (E)</div>
        </div>
        <div className="item">
          <div>Sensing (S)</div>
          <div>
            <ProgressBar leftActive={perspectiveMap[1] === "S"} />
          </div>
          <div>Intuition (N)</div>
        </div>
        <div className="item">
          <div>Thinking (T)</div>
          <div>
            <ProgressBar leftActive={perspectiveMap[2] === "T"} />
          </div>
          <div>Feeling (F)</div>
        </div>
        <div className="item">
          <div>Judging (J)</div>
          <div>
            <ProgressBar leftActive={perspectiveMap[3] === "J"} />
          </div>
          <div>Perceiving (P)</div>
        </div>
      </div>
    </div>
  );
};
