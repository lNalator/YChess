import { ColorEnum } from "../enums/color.enum";
import PiecesHelper from "../helpers/pieces.helper";
import Position from "../interfaces/position";
import Piece from "./piece.model";

export default class Pawn extends Piece {
    value: number;
    isFirstMove: boolean;
    doubleJump: boolean;

    constructor(position: Position, color: ColorEnum, id: string) {
        super(position, color, id);
        this.isFirstMove = true;
        this.doubleJump = false;
        this.value = 1;
    }

    public move(position: Position, piece?: Piece): void {
        this.isFirstMove = false;
        if(piece){
            this.eat(piece);
        }
        if(position.vertical === this.position.vertical + 2 || position.vertical === this.position.vertical - 2){
            this.doubleJump = true; //TODO remettre à false lorsque un pion a doubleJump = true et que c'est son tour
        }
        this.position = position;
    }

    getMovements(allPieces: Array<Piece>): Array<Position> {
        const movements: Array<Position> = [];
        const newPosition: Position = this.position;
        let colorValue: number;

        if(this.color === ColorEnum.WHITE) {
            colorValue = 1;
        } else {
            colorValue = -1;
        }
        
        newPosition.vertical += colorValue;
        if(PiecesHelper.getPieceByPosition(newPosition, allPieces)) {
            movements.push(newPosition);
            if(this.isFirstMove) {
                newPosition.vertical += colorValue;
                if(PiecesHelper.getPieceByPosition(newPosition, allPieces)) {
                    movements.push(newPosition);
                }
                newPosition.vertical -= colorValue;
            }
        }
        
        newPosition.horizontal = this.position.horizontal + 1;
        if(PiecesHelper.getPieceByPosition(newPosition, allPieces)?.color !== this.color) {
            movements.push(newPosition);
        }
        newPosition.horizontal = this.position.horizontal - 1;
        if(PiecesHelper.getPieceByPosition(newPosition, allPieces)?.color !== this.color) {
            movements.push(newPosition);
        }

        newPosition.vertical = this.position.vertical;
        newPosition.horizontal = this.position.horizontal + 1;
        if(PiecesHelper.getPieceByPosition(newPosition, allPieces)?.color !== this.color) {
            const enPassantPawn = PiecesHelper.getPieceByPosition(newPosition, allPieces) as Pawn;
            if(enPassantPawn.doubleJump){
                movements.push(newPosition);
            }
        }
        newPosition.horizontal = this.position.horizontal - 1;
        if(PiecesHelper.getPieceByPosition(newPosition, allPieces)?.color !== this.color) {
            movements.push(newPosition);
            const enPassantPawn = PiecesHelper.getPieceByPosition(newPosition, allPieces) as Pawn;
            if(enPassantPawn.doubleJump){
                movements.push(newPosition);
            }
        }

        return movements;
    }
}