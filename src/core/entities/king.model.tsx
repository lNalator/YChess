import { CastleEnum } from "../enums/castle.enum";
import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece, { afterMovement } from "./piece.model";

export default class King extends Piece {
  value: number;
  isChecked: boolean;
  isFirstMove: boolean;

  constructor(position: Position, color: ColorEnum, id: string) {
    super(position, color, "King", id);
    this.value = 100;
    this.isChecked = false;
    this.isFirstMove = true;
  }

  public move(position: Position, piece?: Piece): afterMovement {
    let hasEaten: boolean = false;
    let ate: Piece | null = null;
    let castle: CastleEnum | null = null;
    this.isFirstMove = false;
    if (position.horizontal === this.position.horizontal + 2) {
      castle = CastleEnum.SMALL;
    }
    if (position.horizontal === this.position.horizontal - 2) {
      castle = CastleEnum.LARGE;
    }
    if (piece) {
      this.eat(piece);
      hasEaten = true;
      ate = piece;
    }
    this.position = position;
    return { hasEaten, ate, castle };
  }

  getMovements(
    currentPlayerPieces: Array<Piece>,
    opponentPieces: Array<Piece>
  ): Array<Position> {
    const movements: Array<Position> = [];

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
      let currentPosition = { ...this.position };

      currentPosition.horizontal += direction.dx;
      currentPosition.vertical += direction.dy;

      if (
        currentPosition.vertical >= 0 &&
        currentPosition.vertical < 8 &&
        currentPosition.horizontal >= 0 &&
        currentPosition.horizontal < 8 &&
        PiecesHelper.getPieceByPosition(currentPosition, [
          ...currentPlayerPieces,
          ...opponentPieces,
        ])?.color !== this.color
      ) {
        movements.push(currentPosition);
      }
    }

    if (PiecesHelper.canSmallCastle(this, currentPlayerPieces)) {
      const newPosition = { ...this.position };
      newPosition.horizontal += 2;
      movements.push(newPosition);
    }

    if (PiecesHelper.canLargeCastle(this, currentPlayerPieces)) {
      const newPosition = { ...this.position };
      newPosition.horizontal -= 2;
      movements.push(newPosition);
      }

    return movements;
  }
}
