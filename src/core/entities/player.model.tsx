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

  constructor(
    name: string,
    color: string,
    score: number,
    isPlaying: boolean,
    time: number
  ) {
    this.name = name;
    this.color = color;
    this.score = score;
    this.isPlaying = isPlaying;
    this.time = time;
    this.pieces = PiecesHelper.createTeam(color as ColorEnum);
  }
}
