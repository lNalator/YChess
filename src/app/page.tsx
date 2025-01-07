import { useState } from "react";
"use client";
import Timer from "@/components/Timer/Timer";
import Grid from "@/components/Board/Grid";
import MenuOverlay from "@/components/MenuOverlay/MenuOverlay";
import { useState } from "react";
import "./page.css";
import PiecesHelper from "@/core/helpers/pieces.helper";
import { ColorEnum } from "@/core/enums/color.enum";
import Piece from "@/core/entities/piece.model";

export default function Home() {
  const [time, setTime] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPlayer1Playing, setIsPlayer1Playing] = useState(true);

  function handleMenuClicked(e: any) {
    if (e) setTime(e);
    setIsMenuOpen(!isMenuOpen);
  }

  function handleTurnClicked() {
    setIsPlayer1Playing(!isPlayer1Playing);
  }

  function startGame(): void {
    const whiteTeam: Array<Piece> = PiecesHelper.createTeam(ColorEnum.WHITE);
    const blackTeam: Array<Piece> = PiecesHelper.createTeam(ColorEnum.BLACK);
    const [allPieces, setAllPieces] = useState([...whiteTeam, ...blackTeam]);
  }

  return (
    <main id="main" suppressHydrationWarning={true}>
      <button className="menu-button" onClick={handleMenuClicked}>
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
      <Grid />
    </main>
  );
}
