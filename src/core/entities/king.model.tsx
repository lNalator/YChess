import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece, { afterMovement } from "./piece.model";

export default class King extends Piece {
  value: number;
  isChecked: boolean;
  isFirstMove: boolean;
  castle: 'large'| 'small' | null;

  constructor(position: Position, color: ColorEnum, id: string) {
    super(position, color, "King", id);
    this.value = 100;
    this.isChecked = false;
    this.isFirstMove = true;
    this.castle = null;
  }

  public move(position: Position, piece?: Piece): afterMovement {
    let hasEaten: boolean = false;
    let ate: Piece | null = null;
    this.isFirstMove = false;
    if(position.horizontal === this.position.horizontal + 2) {
      this.castle = 'small';
    }
    if(position.horizontal === this.position.horizontal - 2) {
      this.castle = 'large';
    }
    if (piece) {
      this.eat(piece);
      hasEaten = true;
      ate = piece;
    }
    this.position = position;
    return { hasEaten, ate };
  }

  getMovements(allPieces: Array<Piece>): Array<Position> {
    const movements: Array<Position> = [];
    let newPosition: Position;

    const directions = [
      { dx: -1, dy: -1 },
      { dx: -1, dy: 0 },
      { dx: -1, dy: 1 },
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: 1, dy: -1 },
      { dx: 1, dy: 0 },
      { dx: 1, dy: 1 },
    ];

    for (const direction of directions) {
      newPosition = { ...this.position };

      newPosition.horizontal += direction.dx;
      newPosition.vertical += direction.dy;

      if (PiecesHelper.isValidPosition(newPosition, allPieces)) {
        movements.push(newPosition);
      }
    }

    if (PiecesHelper.canSmallCastle(this, allPieces)) {
      console.log("canSmallCastle");
      newPosition = { ...this.position };
      newPosition.horizontal += 2;
      movements.push(newPosition);
    }

    if (PiecesHelper.canLargeCastle(this, allPieces)) {
      console.log("canSmallCastle");
      newPosition = { ...this.position };
      newPosition.horizontal -= 2;
      movements.push(newPosition);
    }

    return movements;
  }
}
