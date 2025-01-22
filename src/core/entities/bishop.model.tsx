import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Bishop extends Piece {
  value: number;

  constructor(position: Position, color: ColorEnum, id: string) {
    super(position, color, "Bishop", id);
    this.value = 3;
  }

  getMovements(allPieces: Array<Piece>): Array<Position> {
    const movements: Array<Position> = [];

    const directions = [
      { dx: 1, dy: 1 }, // Diagonale haut-droite
      { dx: 1, dy: -1 }, // Diagonale bas-droite
      { dx: -1, dy: 1 }, // Diagonale haut-gauche
      { dx: -1, dy: -1 }, // Diagonale bas-gauche
    ];

    for (const direction of directions) {
      let currentPosition = { ...this.position };

      while (true) {
        // Mise à jour de la position actuelle dans la direction donnée
        currentPosition = {
          horizontal: currentPosition.horizontal + direction.dx,
          vertical: currentPosition.vertical + direction.dy,
        };

        // Vérifie si la position est hors des limites de l'échiquier
        if (
          currentPosition.horizontal < 0 ||
          currentPosition.horizontal >= 8 ||
          currentPosition.vertical < 0 ||
          currentPosition.vertical >= 8
        ) {
          break; // Stoppe si la position est hors de l'échiquier
        }

        const pieceAtPosition = PiecesHelper.getPieceByPosition(
          currentPosition,
          allPieces
        );

        if (pieceAtPosition) {
          // Si une pièce est rencontrée, vérifier si elle est ennemie
          if (pieceAtPosition.color !== this.color) {
            movements.push({ ...currentPosition }); // Capture possible
          }
          break; // Arrête le parcours dans cette direction après la capture ou l'obstacle
        }

        // Si aucune pièce n'est présente, ajouter la case aux mouvements possibles
        movements.push({ ...currentPosition });
      }
    }

    return movements;
  }
}
