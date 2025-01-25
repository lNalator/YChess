import { CastleEnum } from "../enums/castle.enum";
import { ColorEnum } from "../enums/color.enum";
import Position from "../interfaces/position";

export interface afterMovement {
  hasEaten: boolean;
  ate: Piece | null;
  castle?: CastleEnum | null;
}

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

  public move(position: Position, piece?: Piece): afterMovement {
    let hasEaten: boolean = false;
    let ate: Piece | null = null;
    if (piece) {
      this.eat(piece);
      hasEaten = true;
      ate = piece;
    }
    this.position = position;
    return { hasEaten, ate };
  }

  public eat(piece: Piece): void {
    piece.isAlive = false;
    piece.position = { horizontal: -1, vertical: -1 };
  }

  abstract getMovements(currentPlayerPieces: Array<Piece>, opponentPieces: Array<Piece>): Array<Position>;
}
