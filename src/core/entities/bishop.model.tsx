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

  getAttacks(
      currentPlayerPieces: Array<Piece>,
      opponentPieces: Array<Piece>
    ):Array<Position>{
      return this.getMovements(currentPlayerPieces, opponentPieces, true);
  }

  getMovements(
    currentPlayerPieces: Array<Piece>,
    opponentPieces: Array<Piece>,
    attacks?: boolean
  ): Array<Position> {
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

        if (
          PiecesHelper.getEnemyPiecesByPosition(currentPosition, opponentPieces)
        ) {
          movements.push({ ...currentPosition }); // Capture possible
          break; // Arrête le parcours dans cette direction après la capture
        } else if (
          PiecesHelper.getFriendlyPiecesByPosition(
            currentPosition,
            currentPlayerPieces
          )
        ) {
          if(attacks){
            movements.push({ ...currentPosition });
          }
          break; // Arrête le parcours dans cette direction si une pièce amie est rencontrée
        } else {
          // Si aucune pièce n'est présente, ajouter la case aux mouvements possibles
          movements.push({ ...currentPosition });
        }
      }
    }

    return movements;
  }
}
