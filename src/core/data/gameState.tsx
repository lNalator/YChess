import { atom } from "jotai";
import { ColorEnum } from "../enums/color.enum";
import Player from "../entities/player.model";
import Piece from "../entities/piece.model";

export type GameState = {
  players: Array<Player>;
};

export const gameStateAtom = atom(startGame());

function startGame(): any {
  const player1 = new Player("Player 1", ColorEnum.WHITE, 0, true, 0);
  const player2 = new Player("Player 2", ColorEnum.BLACK, 0, false, 0);

  return { players: [player1, player2] };
}
