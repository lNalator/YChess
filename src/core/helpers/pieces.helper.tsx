import Bishop from "../entities/bishop.model";
import King from "../entities/king.model";
import Knight from "../entities/knight.model";
import Pawn from "../entities/pawn.model";
import Piece from "../entities/piece.model";
import Queen from "../entities/queen.model";
import Rock from "../entities/rock.model";
import { ColorEnum } from "../enums/color.enum";
import Position from "../interfaces/position";

export default class PiecesHelper {
    static createTeam(color: ColorEnum): Array<Piece> {
        const team: Array<Piece> = [];
        let position: Position;
        if(color === ColorEnum.WHITE) {
            position = {
                vertical: 1,
                horizontal: 0,
            };
        } else {
            position = {
                vertical: 6,
                horizontal: 0,
            }
        }
        while(team.length < 8) {
            team.push(new Pawn(position, color));
            position.horizontal += 1;
        }

        position.vertical = color === ColorEnum.WHITE ? 0 : 7;

        team.push(new Rock(position, color));
        position.horizontal -= 1;
        team.push(new Knight(position, color));
        position.horizontal -= 1;
        team.push(new Bishop(position, color));
        position.horizontal -= 1;
        team.push(new Queen(position, color));
        position.horizontal -=1;
        team.push(new King(position, color));
        position.horizontal -=1;
        team.push(new Bishop(position, color));
        position.horizontal -= 1;
        team.push(new Knight(position, color));
        position.horizontal -= 1;
        team.push(new Rock(position, color));

        return team;
    }

    static getPieceByPosition(position: Position, allPieces: Array<Piece>): Piece | null {
        allPieces.forEach(piece => {
            if(piece.position === position) {
                return piece;
            }
        });
        return null;
    }

    static isValidPosition = (newPos: Position, allPieces: Array<Piece>): boolean => {
        return (
            newPos.vertical >= 0 &&
            newPos.vertical < 8 &&
            newPos.horizontal >= 0 &&
            newPos.horizontal < 8 &&
            !PiecesHelper.getPieceByPosition(newPos, allPieces)
        );
    };

    static isEnemyPresent = (newPos: Position, allPieces: Array<Piece>, color: ColorEnum): boolean => {
        const piece = PiecesHelper.getPieceByPosition(newPos, allPieces);
        return piece !== null && piece.color !== color;
    };
    static isKingChecked(allPieces: Array<Piece>, color: ColorEnum): boolean {
        const king: King = allPieces.filter(piece => piece.color === color && piece instanceof King)[0] as King;
        return king.isChecked;
    }
}