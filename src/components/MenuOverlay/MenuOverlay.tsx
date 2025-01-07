import React, { useState } from "react";
import "./menuOverlay.css";

export default function MenuOverlay({
  onClickFunction,
  open,
}: {
  onClickFunction: (e: number) => void;
  open: boolean;
}) {
  const [timeLimit, setTimeLimit] = useState(0);

  return (
    <div className={"menu-overlay " + (open ? "openned" : "closed")}>
      <div className="menu">
        <h1>Menu</h1>
        <div className="menu-content">
          <p>Choose your time limit</p>
          <select
            className="menu-select"
            onChange={(e) => {
              setTimeLimit(parseInt(e.target.value));
            }}
          >
            <option value={0}>Select time</option>
            <option value={300}>5 min</option>
            <option value={600}>10 min</option>
            <option value={900}>15 min</option>
          </select>
          <button
            onClick={() => {
              onClickFunction(timeLimit);
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}
