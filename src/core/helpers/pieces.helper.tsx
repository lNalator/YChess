import { atom } from "jotai";
import Bishop from "../entities/bishop.model";
import King from "../entities/king.model";
import Knight from "../entities/knight.model";
import Pawn from "../entities/pawn.model";
import Piece from "../entities/piece.model";
import Queen from "../entities/queen.model";
import { ColorEnum } from "../enums/color.enum";
import Position from "../interfaces/position";
import Rook from "../entities/rook.model";

export default class PiecesHelper {
  static createTeam(color: ColorEnum): Array<Piece> {
    const team: Array<any> = [];
    const pawnRow = color === ColorEnum.WHITE ? 1 : 6;
    const backRow = color === ColorEnum.WHITE ? 0 : 7;

    // Add pawns
    for (let i = 0; i < 8; i++) {
      const position = { vertical: pawnRow, horizontal: i }; // New object for each pawn
      const id = i.toString();
      team.push(new Pawn(position, color, id));
    }

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
      team.push(new backRowOrder[i](position, color, id));
    }

    return team;
  }

  static getPieceByPosition(
    position: Position,
    pieces: Array<Piece>
  ): Piece | null {
    const piece = pieces.find(
      (piece) =>
        piece.position.horizontal === position.horizontal &&
        piece.position.vertical === position.vertical
    );
    return piece || null;
  }

  static getEnemyPiecesByPosition(position: Position,
    enemyPieces: Array<Piece>
  ): Piece | null {
    const piece = enemyPieces.find(
      (piece) =>
        piece.position.horizontal === position.horizontal &&
        piece.position.vertical === position.vertical
    );
    return piece || null;
  }

  static getFriendlyPiecesByPosition(position: Position,
    friendlyPieces: Array<Piece>
  ): Piece | null {
    const piece = friendlyPieces.find(
      (piece) =>
        piece.position.horizontal === position.horizontal &&
        piece.position.vertical === position.vertical
    );
    return piece || null;
  }

  static isKingInCheck(friendlyPieces: Array<Piece>, enemyPieces: Array<Piece>): boolean {
    const kingPosition = friendlyPieces.find(piece => piece.name === 'King')?.position as Position;

    return !this.isSafePosition(friendlyPieces, enemyPieces, kingPosition);
  }


  static canSmallCastle(king: King, currentPlayerPieces: Array<Piece>): boolean {
    let position: Position;
    position = {
      vertical: king.position.vertical,
      horizontal: king.position.horizontal + 3,
    };
    const piece = this.getPieceByPosition(position, currentPlayerPieces);
    if(!piece){
      return false;
    }
    const rook: Rook = piece as Rook;
    if (
      king.isChecked ||
      !king.isFirstMove ||
      !rook.isFirstMove
    ) {
      return false;
    }
    position.horizontal -= 1;
    if (this.getPieceByPosition(position, currentPlayerPieces) === null) {
      position.horizontal -= 1;
      if (this.getPieceByPosition(position, currentPlayerPieces) === null) {
        return true;
      }
    }
    return false;
  }

  static canLargeCastle(king: King, currentPlayerPieces: Array<Piece>): boolean {
    let position: Position;
    position = {
      vertical: king.position.vertical,
      horizontal: king.position.horizontal - 4,
    };
    const piece = this.getPieceByPosition(position, currentPlayerPieces);
    if(!piece){
      return false;
    }
    const rook: Rook = piece as Rook;
    if (
      king.isChecked ||
      !king.isFirstMove ||
      !rook.isFirstMove
    ) {
      return false;
    }
    position.horizontal += 1;
    if (this.getPieceByPosition(position, currentPlayerPieces) === null) {
      position.horizontal += 1;
      if (this.getPieceByPosition(position, currentPlayerPieces) === null) {
        position.horizontal += 1;
        if (this.getPieceByPosition(position, currentPlayerPieces) === null) {
          return true;
        }
      }
    }
    return false;
  }

  static resetDoubleJump(pieces: Array<Piece>): void {
    pieces.forEach(piece =>{
      const pawn = piece as Pawn;
      if(pawn.doubleJump){
        pawn.doubleJump = false;
      }
    })
  }

  static isSafePosition(friendlyPieces: Array<Piece>, enemyPieces: Array<Piece>, position: Position): boolean {
    const filteredPieces = enemyPieces.filter(piece => piece.name !== 'King' && piece.name !== 'Pawn');
    const pawns = enemyPieces.filter(piece => piece.name === 'Pawn') as Pawn[];
    const king = enemyPieces.find(piece => piece.name === 'King') as King;

    const enemyMovements = filteredPieces.flatMap(piece => 
      piece.getMovements(enemyPieces, friendlyPieces)
    );
    const pawnAttacks = pawns.flatMap(pawn => pawn.getAttacks());
  
    const pos = enemyMovements.find(pos => pos.vertical === position.vertical && pos.horizontal === position.horizontal);
    const pawnPos = pawnAttacks.find(pos => pos.vertical === position.vertical && pos.horizontal === position.horizontal);
    const kingPos = king.getAttacks().find(pos => pos.vertical === position.vertical && pos.horizontal === position.horizontal);
    const isSafe: boolean = pos?.horizontal !== position.horizontal && pawnPos?.horizontal !== position.horizontal && kingPos?.horizontal !== position.horizontal;
    
    return isSafe;
  }

  static simulateMove(friendlyPieces: Array<Piece>, piece: Piece, newPosition: Position): Array<Piece> {
    // Créer une copie des pièces alliées
    const simulatedPieces = friendlyPieces.map(p => {
        // Si c'est la pièce courante, mettre à jour sa position
        if (p === piece) {
            return { ...p, position: newPosition } as Piece;
        }
        return { ...p } as Piece;
    });

    return simulatedPieces;
  }

}
