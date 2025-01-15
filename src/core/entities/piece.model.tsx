import { ColorEnum } from "../enums/color.enum";
import Position from "../interfaces/position";

export default abstract class Piece {
    public id: string;
  public position: Position;
  public isAlive: boolean;
  public color: ColorEnum;
  abstract value: number;
  public name: string;

  constructor(position: Position, color: ColorEnum, name: string, id: string) {
    this.name = name;
    this.position = position;
    this.isAlive = true;
    this.color = color;
        this.id = id;
  }

  public move(position: Position, piece?: Piece): void {
    if (piece) {
      this.eat(piece);
    }
    this.position = position;
  }

  public eat(piece: Piece): void {
    piece.isAlive = false;
  }

  abstract getMovements(allPieces: Array<Piece>): Array<Position>;
}
