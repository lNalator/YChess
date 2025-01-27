import { WritableAtom } from "jotai";
import Player from "../entities/player.model";
import { GameHelper } from "../helpers/game.helper";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { SyncStorage } from "jotai/vanilla/utils/atomWithStorage";
import Piece from "../entities/piece.model";
import Pawn from "../entities/pawn.model";
import King from "../entities/king.model";
import Queen from "../entities/queen.model";
import Rook from "../entities/rook.model";
import Bishop from "../entities/bishop.model";
import Knight from "../entities/knight.model";

export type GameState = {
  players: Array<Player>;
  hasGameEnded: boolean;
  winner: Player | null;
  reason: reason;
};

export type reason = {
  checkmate?: boolean;
  stalemate?: boolean;
  insufficientMaterial?: boolean;
  repetition?: boolean;
  draw?: boolean;
  resign?: boolean;
  timeout?: boolean;
  agreement?: boolean;
};

const classRegistry = {
  Pawn,
  King,
  Queen,
  Rook,
  Bishop,
  Knight,
};

function reviver(key: any, value: any) {
  if (
    value &&
    value.hasOwnProperty("name") &&
    value.hasOwnProperty("color") &&
    value.hasOwnProperty("eatenPieces")
  ) {
    return new Player(
      value.name,
      value.color,
      value.isPlaying,
      value.time,
      value.pieces as Array<Piece>,
      value.eatenPieces,
      value.score,
      value.askedDraw
    );
  }

  if (
    value &&
    typeof value === "object" &&
    value.className &&
    classRegistry[value.className as keyof typeof classRegistry]
  ) {
    const ClassConstructor =
      classRegistry[value.className as keyof typeof classRegistry];
    return Object.assign(
      new ClassConstructor(value.position, value.color, value.id),
      value
    );
  }
  return value;
}

const storage: SyncStorage<GameState> = createJSONStorage(() => localStorage);
storage.getItem = (key) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) return GameHelper.startGame();
  return JSON.parse(storedValue, reviver);
};

export const gameStateAtom = atomWithStorage<GameState>(
  "gameState",
  GameHelper.startGame(),
  storage
) as WritableAtom<GameState, any, void>;
