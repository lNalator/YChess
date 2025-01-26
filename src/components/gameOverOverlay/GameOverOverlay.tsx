import React, { useState } from "react";
import { gameStateAtom } from "@/core/data/gameState";
import { useAtom } from "jotai";
import { GameHelper } from "@/core/helpers/game.helper";
import "./gameOverOverlay.css";

export default function GameOverOverlay({
  onClickFunction,
  open,
}: {
  onClickFunction: (e: number) => void;
  open: boolean;
}) {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [timeLimit, setTimeLimit] = useState(0);
  const { reason, winner } = gameState;

  const gameOverReason = GameHelper.getGameOverReason(reason);

  function handleRematch() {
    onClickFunction(timeLimit);
    setGameState({
      ...gameState,
      hasGameEnded: false,
      winner: null,
      reason: {},
    });
  }

  return (
    <div className={"gameOver-overlay " + (open ? "openned" : "closed")}>
      <div className="gameOver ">
        <h1>{gameOverReason}</h1>
        <div className="gameOver-content">
          {winner && <p>{winner.name} won</p>}
        </div>
        <select
          className="gameOver-select"
          onChange={(e) => {
            setTimeLimit(parseInt(e.target.value));
          }}
        >
          <option value={300}>5 min</option>
          <option value={600}>10 min</option>
          <option value={900}>15 min</option>
        </select>
        <button
          className="gameOver-button"
          onClick={() => {
            handleRematch();
          }}
        >
          Rematch
        </button>
      </div>
    </div>
  );
}
