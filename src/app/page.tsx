"use client";
import { useState } from "react";
import Timer from "@/components/Timer/Timer";
import Grid from "@/components/Board/Grid";
import MenuOverlay from "@/components/MenuOverlay/MenuOverlay";
import PlayerHelper from "@/core/helpers/player.helper";
import "./page.css";
import { useAtom } from "jotai";
import { GameState, gameStateAtom } from "@/core/data/gameState";

export default function Home() {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const { players }: GameState = gameState;
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  function handleMenuClicked(e?: any) {
    if (e) {
      PlayerHelper.setPlayerTime(players, e);
      setGameState({ ...gameState });
    }
    setIsMenuOpen(!isMenuOpen);
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
      ></MenuOverlay>

      <div className="timerContainers">
        <div className="timers">
          <Timer player={players[0]} className="player1" />
          <Timer player={players[1]} className="player2" />
        </div>
      </div>
      <Grid />
    </div>
  );
}
