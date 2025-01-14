import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Pawn extends Piece {
  value: number;
  isFirstMove: boolean;

  constructor(position: Position, color: ColorEnum) {
    super(position, color, "Pawn");
    this.isFirstMove = true;
    this.value = 1;
  }

  public move(position: Position, piece?: Piece): void {
    this.isFirstMove = false;
    if (piece) {
      this.eat(piece);
    }
    this.position = position;
  }

  getMovements(allPieces: Array<Piece>): Array<Position> {
    const movements: Array<Position> = [];
    const newPosition: Position = this.position;

    newPosition.vertical += 1;
    if (PiecesHelper.getPieceByPosition(newPosition, allPieces)) {
      movements.push(newPosition);
      if (this.isFirstMove) {
        newPosition.vertical += 1;
        if (PiecesHelper.getPieceByPosition(newPosition, allPieces)) {
          movements.push(newPosition);
        }
        newPosition.vertical -= 1;
      }
    }

    newPosition.horizontal = this.position.horizontal + 1;
    if (
      PiecesHelper.getPieceByPosition(newPosition, allPieces)?.color !==
      this.color
    ) {
      movements.push(newPosition);
    }
    newPosition.horizontal = this.position.horizontal - 1;
    if (
      PiecesHelper.getPieceByPosition(newPosition, allPieces)?.color !==
      this.color
    ) {
      movements.push(newPosition);
    }

    return movements;
  }
}
