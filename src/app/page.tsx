"use client";
import { useEffect, useState } from "react";
import Timer from "@/components/Timer/Timer";
import Grid from "@/components/Board/Grid";
import MenuOverlay from "@/components/MenuOverlay/MenuOverlay";
import PiecesHelper from "@/core/helpers/pieces.helper";
import { ColorEnum } from "@/core/enums/color.enum";
import Piece from "@/core/entities/piece.model";
import "./page.css";
import { atom, useAtom } from "jotai";
import Player from "@/core/entities/player.model";
import { gameStateAtom } from "@/core/data/gameState";

export default function Home() {
  const [gameState, setGameState] = useAtom(gameStateAtom);
  const [time, setTime] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPlayer1Playing, setIsPlayer1Playing] = useState(true);

  function handleMenuClicked(e?: any) {
    if (e) setTime(e);
    setIsMenuOpen(!isMenuOpen);
  }

  function handleTurnClicked() {
    setIsPlayer1Playing(!isPlayer1Playing);
  }

  useEffect(() => {
  }, [time]);

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
          <Timer
            chosenTime={time}
            isPlaying={isPlayer1Playing}
            className="player1"
          />
          <Timer
            chosenTime={time}
            isPlaying={!isPlayer1Playing}
            className="player2"
          />
        </div>
        <button onClick={handleTurnClicked}>Change turn</button>
      </div>
      <Grid
        isPlayer1Playing={isPlayer1Playing}
        setIsPlayer1Playing={setIsPlayer1Playing}
      />
    </div>
  );
}
