"use client";
import { useState } from "react";
import Timer from "@/components/Timer/Timer";
import Board from "@/components/Board/Board";
import MenuOverlay from "@/components/MenuOverlay/MenuOverlay";
import PlayerHelper from "@/core/helpers/player.helper";
import "./page.css";
import { useAtom } from "jotai";
import { GameState, gameStateAtom } from "@/core/data/gameState";
import GameOverOverlay from "@/components/gameOverOverlay/GameOverOverlay";

export default function Home() {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { players, hasGameEnded }: GameState = gameState;
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  function handleMenuClicked(e?: any) {
    if (e) {
      PlayerHelper.setPlayerTime(players, e);
      setGameState({ ...gameState });
    }
    setIsMenuOpen(!isMenuOpen);
  }

  function handleGameOverClicked(e?: any) {
    if (e) {
      PlayerHelper.setPlayerTime(players, e);
    }
  }

  return (
    <div id="main" suppressHydrationWarning={true}>
      <button className="menu-button" onClick={() => handleMenuClicked()}>
        Menu
      </button>
      <MenuOverlay
        onClickFunction={(e) => {
          handleMenuClicked(e);
        }}
        open={isMenuOpen}
      />
      <GameOverOverlay
        open={hasGameEnded}
        onClickFunction={(e) => {
          handleGameOverClicked(e);
        }}
      />
      <div className="timerContainer">
        <Timer player={players[1]} className="player2" />
      </div>
      <Board />
      <div className="timerContainer">
        <Timer player={players[0]} className="player1" />
      </div>
    </div>
  );
}
