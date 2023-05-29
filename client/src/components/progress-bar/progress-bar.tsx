import React from "react";

interface ProgressBarProps {
  leftActive?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ leftActive }) => {
  return (
    <div className={`progressBar ${leftActive ? "left" : "right"}`}>
      <div className="progressBarFill" style={{ width: "50%" }}></div>
    </div>
  );
};
