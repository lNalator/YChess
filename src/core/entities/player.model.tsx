import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Piece from "./piece.model";

export default class Player {
  name: string;
  color: string;
  score: number;
  isPlaying: boolean;
  time: number;
  pieces: Array<Piece>;
  eatenPieces: Array<Piece>;
  askedDraw: boolean;

  constructor(name: string, color: string, isPlaying: boolean, time: number) {
    this.name = name;
    this.color = color;
    this.isPlaying = isPlaying;
    this.time = time;
    this.pieces = PiecesHelper.createTeam(color as ColorEnum);
    this.eatenPieces = [];
    this.score = 0;
    this.askedDraw = false;
  }

  getPoints() {
    return this.eatenPieces.reduce((acc, piece) => acc + piece.value, 0);
  }
}
