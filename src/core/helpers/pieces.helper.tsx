import { atom } from "jotai";
import Bishop from "../entities/bishop.model";
import King from "../entities/king.model";
import Knight from "../entities/knight.model";
import Pawn from "../entities/pawn.model";
import Piece from "../entities/piece.model";
import Queen from "../entities/queen.model";
import { ColorEnum } from "../enums/color.enum";
import Position from "../interfaces/position";
import Rook from "../entities/Rook.model";

export default class PiecesHelper {
  static createTeam(color: ColorEnum): Array<any> {
    const team: Array<any> = [];
    const pawnRow = color === ColorEnum.WHITE ? 1 : 6;
    const backRow = color === ColorEnum.WHITE ? 0 : 7;

    // Add pawns
    // for (let i = 0; i < 8; i++) {
    //   const position = { vertical: pawnRow, horizontal: i }; // New object for each pawn
    //   const id = i.toString();
    //   team.push(atom(new Pawn(position, color, id)));
    // }

    // Add back row pieces
    const backRowOrder = [
      Rook,
      Knight,
      Bishop,
      Queen,
      King,
      Bishop,
      Knight,
      Rook,
    ];

    for (let i = 0; i < backRowOrder.length; i++) {
      const position = { vertical: backRow, horizontal: i }; // New object for each back-row piece
      const id = 10 + i.toString();
      team.push(atom(new backRowOrder[i](position, color, id)));
    }

    return team;
  }

  static getPieceByPosition(
    position: Position,
    allPieces: Array<Piece>
  ): Piece | null {
    allPieces.forEach((piece) => {
      if (piece.position === position) {
        return piece;
      }
    });
    return null;
  }

  static isValidPosition = (
    newPos: Position,
    allPieces: Array<Piece>
  ): boolean => {
    return (
      newPos.vertical >= 0 &&
      newPos.vertical < 8 &&
      newPos.horizontal >= 0 &&
      newPos.horizontal < 8 &&
      !PiecesHelper.getPieceByPosition(newPos, allPieces)
    );
  };

  static isEnemyPresent = (
    newPos: Position,
    allPieces: Array<Piece>,
    color: ColorEnum
  ): boolean => {
    const piece = PiecesHelper.getPieceByPosition(newPos, allPieces);
    return piece !== null && piece.color !== color;
  };

  static isKingChecked(allPieces: Array<Piece>, color: ColorEnum): boolean {
    const king: King = allPieces.filter(
      (piece) => piece.color === color && piece instanceof King
    )[0] as King;
    return king.isChecked;
  }

  static canSmallCastle(king: King, allPieces: Array<Piece>): boolean {
    let position: Position = king.position;
    position.horizontal += 3;
    const piece = this.getPieceByPosition(position, allPieces);
    const Rook: Rook = piece as Rook;
    if (
      king.isChecked ||
      !king.isFirstMove ||
      piece === null ||
      !Rook.isFirstMove
    ) {
      return false;
    }
    position.horizontal -= 1;
    if (this.getPieceByPosition(position, allPieces) === null) {
      position.horizontal -= 1;
      if (this.getPieceByPosition(position, allPieces) === null) {
        return true;
      }
    }
    return false;
  }

  static canLargeCastle(king: King, allPieces: Array<Piece>): boolean {
    let position: Position = king.position;
    position.horizontal -= 4;
    const piece = this.getPieceByPosition(position, allPieces);
    const Rook: Rook = piece as Rook;
    if (
      king.isChecked ||
      !king.isFirstMove ||
      piece === null ||
      !Rook.isFirstMove
    ) {
      return false;
    }
    position.horizontal += 1;
    if (this.getPieceByPosition(position, allPieces) === null) {
      position.horizontal += 1;
      if (this.getPieceByPosition(position, allPieces) === null) {
        if (this.getPieceByPosition(position, allPieces) === null) {
          return true;
        }
      }
    }
    return false;
  }
}
