import { useState } from "react";
import "./page.css";
import Grid from "@/components/Board/Grid";
import PiecesHelper from "@/core/helpers/pieces.helper";
import { ColorEnum } from "@/core/enums/color.enum";
import Piece from "@/core/entities/piece.model";

export default function Home() {
  function startGame(): void {
    const whiteTeam: Array<Piece> = PiecesHelper.createTeam(ColorEnum.WHITE);
    const blackTeam: Array<Piece> = PiecesHelper.createTeam(ColorEnum.BLACK);
    const [allPieces, setAllPieces] = useState([...whiteTeam, ...blackTeam]);
  }

  return (
    <main id="main">
      <Grid></Grid>
    </main>
  );
}
