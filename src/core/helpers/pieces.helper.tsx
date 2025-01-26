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
import { AfterMovement } from "../interfaces/afterMovement";
import { CastleEnum } from "../enums/castle.enum";
import Player from "../entities/player.model";
import PlayerHelper from "./player.helper";

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

  static getEnemyPiecesByPosition(
    position: Position,
    enemyPieces: Array<Piece>
  ): Piece | null {
    const piece = enemyPieces.find(
      (piece) =>
        piece.position.horizontal === position.horizontal &&
        piece.position.vertical === position.vertical
    );
    return piece || null;
  }

  static getFriendlyPiecesByPosition(
    position: Position,
    friendlyPieces: Array<Piece>
  ): Piece | null {
    const piece = friendlyPieces.find(
      (piece) =>
        piece.position.horizontal === position.horizontal &&
        piece.position.vertical === position.vertical
    );
    return piece || null;
  }

  static isKingChecked(allPieces: Array<Piece>, color: ColorEnum): boolean {
    const king: King = allPieces.filter(
      (piece) => piece.color === color && piece instanceof King
    )[0] as King;
    return king.isChecked;
  }

  static canSmallCastle(
    king: King,
    currentPlayerPieces: Array<Piece>
  ): boolean {
    let position: Position;
    position = {
      vertical: king.position.vertical,
      horizontal: king.position.horizontal + 3,
    };
    const piece = this.getPieceByPosition(position, currentPlayerPieces);
    if (!piece) {
      return false;
    }
    const rook: Rook = piece as Rook;
    if (king.isChecked || !king.isFirstMove || !rook.isFirstMove) {
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

  static canLargeCastle(
    king: King,
    currentPlayerPieces: Array<Piece>
  ): boolean {
    let position: Position;
    position = {
      vertical: king.position.vertical,
      horizontal: king.position.horizontal - 4,
    };
    const piece = this.getPieceByPosition(position, currentPlayerPieces);
    if (!piece) {
      return false;
    }
    const rook: Rook = piece as Rook;
    if (king.isChecked || !king.isFirstMove || !rook.isFirstMove) {
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

  static moveRookForCastle(
    playingPlayer: Player,
    kingPiece: Piece,
    castle: string
  ): void {
    // Déplacer aussi la tour si il y a roque
    if (castle === CastleEnum.SMALL) {
      const rookPosition =
        kingPiece.color === ColorEnum.WHITE
          ? { vertical: 0, horizontal: 7 }
          : { vertical: 7, horizontal: 7 };
      const rookNextPosition =
        kingPiece.color === ColorEnum.WHITE
          ? { vertical: 0, horizontal: 5 }
          : { vertical: 7, horizontal: 5 };
      const rook = PiecesHelper.getFriendlyPiecesByPosition(
        rookPosition,
        playingPlayer.pieces
      ) as Rook;
      rook.move(rookNextPosition);
    } else if (castle === CastleEnum.LARGE) {
      const rookPosition =
        kingPiece.color === ColorEnum.WHITE
          ? { vertical: 0, horizontal: 0 }
          : { vertical: 7, horizontal: 0 };
      const rookNextPosition =
        kingPiece.color === ColorEnum.WHITE
          ? { vertical: 0, horizontal: 3 }
          : { vertical: 7, horizontal: 3 };
      const rook = PiecesHelper.getFriendlyPiecesByPosition(
        rookPosition,
        playingPlayer.pieces
      ) as Rook;
      rook.move(rookNextPosition);
    }
  }

  static eatEnPassant(
    pawn: Piece,
    playingPlayer: Player,
    notPlayingPlayer: Player
  ): void {
    const ennemyPawnPosition: Position =
      pawn.color === ColorEnum.WHITE
        ? {
            vertical: pawn.position.vertical - 1,
            horizontal: pawn.position.horizontal,
          }
        : {
            vertical: pawn.position.vertical + 1,
            horizontal: pawn.position.horizontal,
          };
    const ennemyPawn = PiecesHelper.getEnemyPiecesByPosition(
      ennemyPawnPosition,
      notPlayingPlayer.pieces
    ) as Piece;
    pawn.eat(ennemyPawn);
    PlayerHelper.eatPiece(playingPlayer, notPlayingPlayer, ennemyPawn);
  }

  static pawnPromotion(
    pawn: Piece,
    { horizontal, vertical }: Position,
    playingPlayer: Player
  ): void {
    const promotedQueen = new Queen(
      { vertical, horizontal },
      pawn.color,
      pawn.id
    );
    const index = playingPlayer.pieces.findIndex(
      (el) =>
        el.position.horizontal === horizontal &&
        el.position.vertical === vertical
    );
    playingPlayer.pieces[index] = promotedQueen;
  }

  static resetDoubleJump(pieces: Array<Piece>): void {
    pieces.forEach((piece) => {
      const pawn = piece as Pawn;
      if (pawn.doubleJump) {
        pawn.doubleJump = false;
      }
    });
  }
}
