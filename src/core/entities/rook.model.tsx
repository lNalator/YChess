import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece, { afterMovement } from "./piece.model";

export default class Rook extends Piece {
  value: number;
  isFirstMove: boolean;

  constructor(position: Position, color: ColorEnum, id: string) {
    super(position, color, "Rook", id);
    this.value = 5;
    this.isFirstMove = true;
  }

  public move(position: Position, piece?: Piece): afterMovement {
    let hasEaten: boolean = false;
    let ate: Piece | null = null;
    this.isFirstMove = false;
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

    const directions = [
      { dx: 0, dy: 1 }, // Vers le haut
      { dx: 0, dy: -1 }, // Vers le bas
      { dx: 1, dy: 0 }, // Vers la droite
      { dx: -1, dy: 0 }, // Vers la gauche
    ];

    for (const direction of directions) {
      let currentPosition = { ...this.position };

      while (true) {
        currentPosition = {
          horizontal: currentPosition.horizontal + direction.dx,
          vertical: currentPosition.vertical + direction.dy,
        };

        if (
          currentPosition.horizontal < 0 ||
          currentPosition.horizontal >= 8 ||
          currentPosition.vertical < 0 ||
          currentPosition.vertical >= 8
        ) {
          break;
        }

        const pieceAtPosition = PiecesHelper.getPieceByPosition(
          currentPosition,
          allPieces
        );
        if (pieceAtPosition) {
          // Si une pièce est rencontrée, vérifier si elle est ennemie
          if (pieceAtPosition.color !== this.color) {
            movements.push({ ...currentPosition });
          } else {
          }
          break;
        }

        // Si aucune pièce n'est présente, ajouter la case aux mouvements possibles
        movements.push({ ...currentPosition });
      }
    }

    return movements;
  }
}
