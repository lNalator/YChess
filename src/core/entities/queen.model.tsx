import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Queen extends Piece {
  value: number;

  constructor(position: Position, color: ColorEnum, id: string) {
    super(position, color, "Queen", id);
    this.value = 9;
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
    attacks?: boolean,
  ): Array<Position> {
    const movements: Array<Position> = [];

    const directions = [
      { dx: 0, dy: 1 }, // Vers le haut
      { dx: 0, dy: -1 }, // Vers le bas
      { dx: 1, dy: 0 }, // Vers la droite
      { dx: -1, dy: 0 }, // Vers la gauche
      { dx: 1, dy: 1 }, // Diagonale haut-droite
      { dx: 1, dy: -1 }, // Diagonale bas-droite
      { dx: -1, dy: 1 }, // Diagonale haut-gauche
      { dx: -1, dy: -1 }, // Diagonale bas-gauche
    ];

    for (const direction of directions) {
      let currentPosition = { ...this.position };

      while (true) {
        // Mise à jour de la position actuelle en fonction de la direction
        currentPosition = {
          horizontal: currentPosition.horizontal + direction.dx,
          vertical: currentPosition.vertical + direction.dy,
        };

        // Vérification des limites de l'échiquier
        if (
          currentPosition.horizontal < 0 ||
          currentPosition.horizontal >= 8 ||
          currentPosition.vertical < 0 ||
          currentPosition.vertical >= 8
        ) {
          break;
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
