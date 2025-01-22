"use client";
import { useEffect, useState } from "react";
import Timer from "@/components/Timer/Timer";
import Grid from "@/components/Board/Grid";
import MenuOverlay from "@/components/MenuOverlay/MenuOverlay";
import PiecesHelper from "@/core/helpers/pieces.helper";
import { ColorEnum } from "@/core/enums/color.enum";
import Piece from "@/core/entities/piece.model";
import "./page.css";
import { atom } from "jotai";
import Player from "@/core/entities/player.model";

interface GameState {
  pieces: Array<Piece>;
  players: Array<Player>;
}

export default function Home() {
  const [gameState, setGameState] = useState({} as GameState);
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

  function startGame(): any {
    const allPieces = [
      ...PiecesHelper.createTeam(ColorEnum.WHITE),
      ...PiecesHelper.createTeam(ColorEnum.BLACK),
    ];

    const player1 = atom(new Player("Player 1", ColorEnum.WHITE, 0));
    const player2 = atom(new Player("Player 2", ColorEnum.BLACK, 0));

    console.log({ pieces: allPieces, players: [player1, player2] });
    return { pieces: allPieces, players: [player1, player2] };
  }

  useEffect(() => {
    setGameState(startGame());
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
        piecesState={gameState.pieces || [[]]}
        isPlayer1Playing={isPlayer1Playing}
        setIsPlayer1Playing={setIsPlayer1Playing}
      />
    </div>
  );
}
