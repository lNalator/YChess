"use client";
import Timer from "@/components/Timer/Timer";
import "./page.css";
import Grid from "@/components/Board/Grid";
import { useState } from "react";
import PiecesHelper from "@/core/helpers/pieces.helper";
import { ColorEnum } from "@/core/enums/color.enum";
import Piece from "@/core/entities/piece.model";

export default function Home() {
  const [deadline, setDeadline] = useState(0);

  function startGame(): void {
    const whiteTeam: Array<Piece> = PiecesHelper.createTeam(ColorEnum.WHITE);
    const blackTeam: Array<Piece> = PiecesHelper.createTeam(ColorEnum.BLACK);
    const [allPieces, setAllPieces] = useState([...whiteTeam, ...blackTeam]);
  }

  return (
    <main id="main" suppressHydrationWarning={true}>
      <div>
        <select
          className="menu"
          value={deadline}
          onChange={(e) => {
            console.log(e.target.value);
            setDeadline(parseInt(e.target.value));
          }}
        >
          <option value={300000}>5 min</option>
          <option value={600000}>10 min</option>
          <option value={900000}>15 min</option>
        </select>
      </div>

      <p>deadline : {deadline}</p>
      <Timer chosenDeadline={Date.now() + deadline}></Timer>
      <Grid></Grid>
    </main>
  );
}
