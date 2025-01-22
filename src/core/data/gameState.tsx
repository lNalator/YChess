import { atom } from "jotai";
import { ColorEnum } from "../enums/color.enum";
import Player from "../entities/player.model";
import PiecesHelper from "../helpers/pieces.helper";

export const gameStateAtom = atom(startGame());

function startGame(): any {
  const allPieces = [
    ...PiecesHelper.createTeam(ColorEnum.WHITE),
    ...PiecesHelper.createTeam(ColorEnum.BLACK),
  ];

  const player1 = new Player("Player 1", ColorEnum.WHITE, 0);
  const player2 = new Player("Player 2", ColorEnum.BLACK, 0);

  console.log({ pieces: allPieces, players: [player1, player2] });
  return { pieces: allPieces, players: [player1, player2] };
}
